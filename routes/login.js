var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con=mysql.createConnection({
  host:"localhost",
  user:"root",      
  password:"",
  database:"unibites"
});



router.post('/', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;   
    let sql=`SELECT * FROM tbl_login WHERE username='${username}' AND password='${password}'`;
    con.query(sql, function(err, result){
        if(err) throw err;
       res.send(result);
    });
});

module.exports = router;
