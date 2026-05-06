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
    let total = req.body.total;
    let date = new Date().toISOString().slice(0, 10);
    let sql = `SELECT * FROM tbl_bookingdetails WHERE id='${login_id}' AND bookingmaster_id=0`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            let food_id = result[i].food_id;
            let quantity = result[i].quantity;
            let sql1 = `SELECT * FROM tbl_food WHERE food_id='${food_id}'`;
            con.query(sql1, function (err, result1) {
                if (err) throw err;
                let available_quantity = result1[0].quantity;
                let balance_quantity = available_quantity - quantity;
                if (balance_quantity == 0) {

                    let updatesql = 'update tbl_food set quantity=quantity - ?,status="Out of stock" where food_id=?';
                    con.query(updatesql, [quantity, food_id], function (err1, result1) {
                        if (err1) throw err1;
                    });
                } else {
                    let updatesql = 'update tbl_food set quantity=quantity - ? where food_id=?';
                    con.query(updatesql, [quantity, food_id], function (err1, result1) {
                        if (err1) throw err1;
                    });
                }
            });
        }
        let insertsql = `INSERT INTO tbl_bookingmaster (id,bookingdate,type,actualamount,consessionamount,totalamount,status) VALUES ('${login_id}','${date}','Offline','${total}','0','${total}','Pending')`;
        con.query(insertsql, function (err2, result2) {
            let bokkingmaster_id = result2.insertId;
            if (err2) throw err2;
            let updatesql2 = `UPDATE tbl_bookingdetails SET bookingmaster_id='${bokkingmaster_id}' WHERE id='${login_id}' AND bookingmaster_id=0`;
            con.query(updatesql2, function (err3, result3) {
                if (err3) throw err3;
                res.send({ message: 'Success' });
            });
        });
    });
});


module.exports = router;
