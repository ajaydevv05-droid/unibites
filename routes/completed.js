var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});

/* UPDATE ORDER STATUS TO COMPLETED */
router.post('/', function (req, res) {

    let bookingmaster_id = req.body.bookingmaster_id;

    console.log("Booking ID:", bookingmaster_id);

    let sql1 = "UPDATE tbl_bookingmaster SET status='completed' WHERE bookingmaster_id = ?";
    let sql2 = "UPDATE tbl_payment SET status='completed' WHERE bookingmaster_id = ?";

    // First update bookingmaster
    con.query(sql1, [bookingmaster_id], (err, result1) => {

        if (err) {
            console.log(err);
            return res.send({ message: "error in bookingmaster" });
        }

        // Then update payment
        con.query(sql2, [bookingmaster_id], (err, result2) => {

            if (err) {
                console.log(err);
                return res.send({ message: "error in payment" });
            }

            if (result1.affectedRows > 0 || result2.affectedRows > 0) {
                res.send({ message: "updated" });
            } else {
                res.send({ message: "notfound" });
            }

        });

    });

});

module.exports = router;