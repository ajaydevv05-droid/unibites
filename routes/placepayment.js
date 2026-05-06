var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var nodemailer=require('nodemailer');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});



router.post('/', function (req, res, next) {
     let login_id = req.body.login_id;
    let total = req.body.total;
    let date = new Date().toISOString().slice(0, 10);

    // ⚠️ Changed to parameterized query (important)
    let sql = `SELECT * FROM tbl_bookingdetails WHERE id=? AND bookingmaster_id=0`;

    con.query(sql, [login_id], function (err, result) {
        if (err) return res.status(500).send(err);

        // 🔁 Update food stock
        for (let i = 0; i < result.length; i++) {

            let food_id = result[i].food_id;
            let quantity = result[i].quantity;

            let sql1 = `SELECT * FROM tbl_food WHERE food_id=?`;

            con.query(sql1, [food_id], function (err, result1) {
                if (err) throw err;

                let available_quantity = result1[0].quantity;
                let balance_quantity = available_quantity - quantity;

                if (balance_quantity <= 0) {
                    let updatesql = `
                        UPDATE tbl_food 
                        SET quantity = quantity - ?, status="Out of stock" 
                        WHERE food_id=?`;
                    con.query(updatesql, [quantity, food_id]);
                } else {
                    let updatesql = `
                        UPDATE tbl_food 
                        SET quantity = quantity - ? 
                        WHERE food_id=?`;
                    con.query(updatesql, [quantity, food_id]);
                }
            });
        }

        // ✅ Insert booking master
        let insertsql = `
            INSERT INTO tbl_bookingmaster
            (id,bookingdate,type,actualamount,consessionamount,totalamount,status)
            VALUES (?,?,?,?,?,?,?)`;

        con.query(insertsql,
            [login_id, date, 'Online', total, 0, total, 'Paid'],
            function (err2, result2) {

                if (err2) return res.status(500).send(err2);

                let bookingmaster_id = result2.insertId;

                let updatesql2 = `
                    UPDATE tbl_bookingdetails 
                    SET bookingmaster_id=? 
                    WHERE id=? AND bookingmaster_id=0`;

                con.query(updatesql2,
                    [bookingmaster_id, login_id],
                    function (err3) {

                        if (err3) return res.status(500).send(err3);

                        let insertsql1 = `
                            INSERT INTO tbl_payment
                            (bookingmaster_id,paymentdate,amount,id,status,type)
                            VALUES (?,?,?,?,?,?)`;

                        con.query(insertsql1,
                            [bookingmaster_id, date, total, login_id, 'Paid', 'Online'],
                            function (err4) {

                                if (err4) return res.status(500).send(err4);

                                // ========================
                                // 📧 SEND CONFIRMATION MAIL
                                // ========================

                                let emailQuery = `
                                    SELECT 
                                        COALESCE(s.student_email, c.staff_email) AS email,
                                        COALESCE(s.student_name, c.staff_name) AS name
                                    FROM tbl_login l
                                    LEFT JOIN tbl_student s ON l.login_id = s.login_id
                                    LEFT JOIN tbl_collegestaff c ON l.login_id = c.login_id
                                    WHERE l.login_id = ?`;

                                con.query(emailQuery, [login_id], function (err5, userResult) {

                                    if (!err5 && userResult.length > 0) {

                                        let userEmail = userResult[0].email;
                                        let userName = userResult[0].name;

                                        const transporter = nodemailer.createTransport({
                                            service: "gmail",
                                            auth: {
                                                user: "ajaydevv05@gmail.com",
                                                pass: "opfisadtbxhjwgvt"
                                            }
                                        });

                                        const mailOptions = {
                                            from: '"UniBites 🍽️" <ajaydevv05@gmail.com>',
                                            to: userEmail,
                                            subject: "🧾 UniBites Order Confirmation",
                                            html: `
                                                <div style="font-family: Arial; padding:20px;">
                                                    <h2 style="color:#ff6b00;">
                                                        Order Confirmed 🎉
                                                    </h2>
                                                    <p>Hello <b>${userName}</b>,</p>
                                                    <p>Your order has been successfully placed.</p>
                                                    <p>
                                                        <b>Order ID:</b> ${bookingmaster_id}<br>
                                                        <b>Date:</b> ${date}<br>
                                                        <b>Total Amount:</b> ₹${total}
                                                    </p>
                                                    <hr>
                                                    <p>
                                                        Thank you for choosing UniBites.
                                                        Enjoy your meal! 🍔
                                                    </p>
                                                    <br>
                                                    <p>
                                                        Regards,<br>
                                                        <b>Team UniBites</b>
                                                    </p>
                                                </div>
                                            `
                                        };

                                        transporter.sendMail(mailOptions, function (mailErr) {
                                            if (mailErr)
                                                console.log("Mail Error:", mailErr);
                                        });
                                    }

                                    res.send({ message: 'Success' });
                                });

                            });
                    });
            });
    });
});

module.exports = router;
