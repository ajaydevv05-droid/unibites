var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql2'); 
var con = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "unibites" 
}) 
router.get('/', (req, res, next) => { 
    let date = new Date().toISOString().slice(0, 10);
    let query = `select s.student_name,s.student_photo,b.totalamount,b.bookingdate,b.bookingmaster_id,s.student_photo,b.type,'student' AS role  from tbl_bookingmaster b inner join tbl_student s on b.id=s.login_id where b.bookingdate = '${date}' and b.status='Pending' or b.status='paid'
    UNION 
    select c.staff_name,c.staff_photo,b.totalamount,b.bookingdate,b.bookingmaster_id,c.staff_photo,b.type,'staff' AS role from tbl_bookingmaster b inner join tbl_collegestaff c on b.id=c.login_id where b.bookingdate = '${date}' and b.status='Pending' or b.status='paid'`; 
    console.log(query); 
    con.query(query, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
/* GET users listing. */ 
 
module.exports = router; 