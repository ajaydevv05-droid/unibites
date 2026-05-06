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
    var category_id = req.body.category_id;
    var category_name = req.body.categoryName;
    var description = req.body.description;
    var category_image = req.body.categoryImage;
    let sql=`update tbl_category set category_name='${category_name}', description='${description}', category_image='${category_image}' where category_id='${category_id}'`;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) 
            throw err;
        res.send({message: "updated"});
});
});
module.exports = router;