var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con=mysql.createConnection({
  host:"localhost",
  user:"root",      
  password:"",
  database:"unibites"
});
router.post('/',(req, res, next) => {
    let foodname = req.body.foodName;
    let foodimage = req.body.foodImage;
    let description = req.body.description;  
     let amount = req.body.amount;  
      let quantity = req.body.quantity; 
      let category_id=req.body.category_id;      
      
        let regdate = new Date().toISOString().slice(0, 10);  
       let query=`select * from tbl_food where food_name='${foodname}';`;
    con.query(query,(err,rows)=>{
      if(err) throw err;
      if(rows==""){
    let sql=`INSERT INTO tbl_food(food_name,category_id,food_image,amount,description,status,quantity) VALUES(?,?,?,?,?,?,?)`;
    con.query(sql,[foodname,category_id,foodimage,amount,description,'available',quantity],(err,result)=>{
      if(err) throw err;
      let food_id=result.insertId;
       let sql1=`INSERT INTO tbl_foodstock(food_id,stock,date) VALUES(?,?,?)`;
    con.query(sql1,[food_id,quantity,regdate])
      res.send({message:'success'})
    })
    } 
    else{
      res.send({message:'failed'})
    }
});
});
module.exports = router;