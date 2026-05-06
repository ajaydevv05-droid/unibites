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
    let categoryname = req.body.categoryName;
    let categoryimage = req.body.categoryImage;
    let description = req.body.description;   
    let query=`select * from tbl_category where category_name='${categoryname}';`;
    con.query(query,(err,rows)=>{
      if(err) throw err;
      if(rows==""){
    let sql=`INSERT INTO tbl_category(category_name,category_image,description) VALUES(?,?,?)`;
    con.query(sql,[categoryname,categoryimage,description])
    res.send({message:'success'})
    
    } 
    else{
      res.send({message:'failed'})
    }
});
});
module.exports = router;