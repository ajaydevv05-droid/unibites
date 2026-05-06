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
    f.food_name,
    f.food_image,
    f.description,
    b.amount,
    b.quantity
FROM tbl_bookingdetails b
INNER JOIN tbl_food f
    ON b.food_id = f.food_id
WHERE b.id = '${login_id}' AND b.bookingmaster_id = 0;
    `; 
    console.log(query); 
    con.query(query, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
/* GET users listing. */ 
 
module.exports = router; 