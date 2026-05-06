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
    let food_id = req.body.food_id;
    let stock = req.body.stock;
    let sql = `update tbl_food set quantity='${stock}',status='available' where food_id='${food_id}'`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        let sql1=`insert into tbl_foodstock(food_id,stock,date) values(?,?,?)`;
        con.query(sql1,[food_id,stock,new Date()],(err1,result1)=>{
            if(err1) throw err1;
        })
        res.send({ message: "success" });
    });
});
module.exports = router;
