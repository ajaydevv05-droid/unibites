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
    var login_id = req.body.login_id;
    let query = `SELECT 
    f.*,b.*,m.*
FROM tbl_bookingdetails b
INNER JOIN tbl_food f
    ON b.food_id = f.food_id
INNER JOIN tbl_bookingmaster m ON b.bookingmaster_id = m.bookingmaster_id
WHERE m.id = '${login_id}' and b.bookingmaster_id =  m.bookingmaster_id and m.status='Paid'`;
    console.log(query);
    con.query(query, (err, rows) => {
        if (err)
            throw err;
        res.send(rows);
    });
});
/* GET users listing. */

module.exports = router; 