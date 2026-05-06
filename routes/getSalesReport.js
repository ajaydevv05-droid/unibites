var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites",
    connectionLimit: 10
});


router.get('/', (req, res) => {

   var sql=`select count(bookingmaster_id) as count from tbl_bookingmaster where month(bookingdate)`;
   con.query(sql,(err,rows)=>{
    
   });
});

module.exports = router;