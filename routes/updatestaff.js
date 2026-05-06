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
    var staff_id = req.body.staff_id;
    var staff_name = req.body.staffName;
    var email = req.body.email;
    var image = req.body.staffImage;
    var contact = req.body.contact;
    let sql=`update tbl_collegestaff set staff_name='${staff_name}', staff_email='${email}', staff_photo='${image}', staff_contact='${contact}' where staff_id='${staff_id}'`;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) 
            throw err;
        res.send({message: "updated"});
});
});
module.exports = router;