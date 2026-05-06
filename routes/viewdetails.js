var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
})
router.post('/', (req, res, next) => {
    let bookingmaster_id = req.body.bookingmaster_id;
    let query = `select f.food_name,f.food_image,b.quantity,m.totalamount,b.amount from tbl_bookingdetails b inner join tbl_food f on b.food_id=f.food_id 
    inner join tbl_bookingmaster m on b.bookingmaster_id=m.bookingmaster_id where b.bookingmaster_id=${bookingmaster_id}`;
    con.query(query, (err, rows) => {
        console.log(query);
        if (err)
            throw err;
        res.send(rows);
    });
});
module.exports = router;