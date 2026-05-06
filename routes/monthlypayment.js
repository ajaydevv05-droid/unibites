var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});


router.post('/', function (req, res, next) {
    let login_id = req.body.login_id;
    let month = new Date().getMonth() + 1;
   let date = new Date().toISOString().slice(0, 10);
    let sql = `SELECT * FROM tbl_bookingmaster WHERE id='${login_id}' AND month(bookingdate)='${month}' AND status='Pending'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            let bookingmaster_id = result[i].bookingmaster_id;
            let totalamount = result[i].totalamount;
            let insertsql1 = 'insert into tbl_payment(bookingmaster_id,paymentdate,amount,id,status,type) values(?,?,?,?,?,?)';
            con.query(insertsql1, [bookingmaster_id, date, totalamount, login_id, 'Paid', 'Online'], function (err4, result4) {
                if (err4) throw err4;

                let updatesql = `update tbl_bookingmaster set status='Paid' where bookingmaster_id='${bookingmaster_id}'`;
                con.query(updatesql, function (err5, result5) {
                    if (err5) throw err5;
                });
            });
        }
        res.send({ message: 'Success' });
    });
});

module.exports = router;
