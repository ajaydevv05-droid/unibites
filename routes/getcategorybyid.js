var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql2'); 
var con = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "unibites" 
})
router.post('/', function(req, res, next) {

    var cyid = req.body.id;

    let query = `SELECT * FROM tbl_food WHERE category_id=${cyid}`;
    console.log(query);

    con.query(query, function(err, rows) {
        if (err) throw err;
        res.send(rows);
    });

});
module.exports = router;