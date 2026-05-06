var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});

router.post('/', (req, res) => {

    let from = req.body.from;
    let to = req.body.to;

    let report = {};

    // 1️⃣ SUMMARY
    let summaryQuery = `
SELECT
    SUM(m.totalamount) AS total_revenue,
    COUNT(DISTINCT m.bookingmaster_id) AS total_orders,
    SUM(d.quantity) AS itemsold,
    COUNT(DISTINCT m.id) AS customercount
FROM tbl_bookingmaster m
INNER JOIN tbl_bookingdetails d 
    ON m.bookingmaster_id = d.bookingmaster_id
WHERE m.bookingdate BETWEEN ? AND ?
AND m.status IN ('Completed','Paid')
`;

    con.query(summaryQuery, [from, to], (err, summary) => {
        console.log(summaryQuery, [from, to]);
        if (err) return res.status(500).json(err);

        report.summary = summary[0];

        // 2️⃣ MONTH WISE SALES
        let dateQuery = `
SELECT DATE_FORMAT(bookingdate, '%Y-%m') AS month,
       SUM(totalamount) AS monthly_sales
FROM tbl_bookingmaster
WHERE bookingdate BETWEEN ? AND ?
AND status IN ('Completed','Paid')
GROUP BY DATE_FORMAT(bookingdate, '%Y-%m')
ORDER BY DATE_FORMAT(bookingdate, '%Y-%m')
`;

        con.query(dateQuery, [from, to], (err, dateSales) => {
            if (err) return res.status(500).json(err);

            report.monthlySales = dateSales;

            // 3️⃣ TOP ITEMS
            let itemQuery = `
                SELECT f.food_name,
                       SUM(bd.quantity) AS total_qty
                FROM tbl_bookingdetails bd
                JOIN tbl_bookingmaster bm 
                    ON bd.bookingmaster_id = bm.bookingmaster_id
                JOIN tbl_food f 
                    ON bd.food_id = f.food_id
                WHERE bm.bookingdate BETWEEN ? AND ?
                GROUP BY bd.food_id
                ORDER BY total_qty DESC
                LIMIT 5
            `;

            con.query(itemQuery, [from, to], (err, topItems) => {
                if (err) return res.status(500).json(err);

                report.topItems = topItems;

                // 4️⃣ PAYMENT METHOD
                let paymentQuery = `
                    SELECT type,
                           SUM(amount) AS total
                    FROM tbl_payment
                    WHERE paymentdate BETWEEN ? AND ?
                    GROUP BY type
                `;

                con.query(paymentQuery, [from, to], (err, payment) => {
                    if (err) return res.status(500).json(err);

                    report.payment = payment;

                    res.json(report);
                });
            });
        });
    });
});

module.exports = router;            