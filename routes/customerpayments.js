var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});
router.get('/', function (req, res) {
     let query = `SELECT 'Student' AS role, p.payment_id,st.student_name,st.student_email,p.amount,p.paymentdate,p.type,p.status
        FROM tbl_payment p
        INNER JOIN tbl_student st ON p.id = st.login_id where p.status='completed' 
        union
        SELECT 'Staff' AS role, p.payment_id,sf.staff_name,sf.staff_email,p.amount,p.paymentdate,p.type,p.status
        FROM tbl_payment p
        INNER JOIN tbl_collegestaff sf ON p.id = sf.login_id where p.status='completed' `;

    con.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});
router.post('/filter', function (req, res) {
    let frpmdate = req.body.fromdate;
    let todate = req.body.todate;
     let query = `SELECT 'Student' AS role, p.payment_id,st.student_name,st.student_email,p.amount,p.paymentdate,p.type,p.status
        FROM tbl_payment p
        INNER JOIN tbl_student st ON p.id = st.login_id where p.status='completed' and p.paymentdate BETWEEN '${frpmdate}' AND '${todate}'
        union
        SELECT 'Staff' AS role, p.payment_id,sf.staff_name,sf.staff_email,p.amount,p.paymentdate,p.type,p.status
        FROM tbl_payment p
        INNER JOIN tbl_collegestaff sf ON p.id = sf.login_id where p.status='completed' and p.paymentdate BETWEEN '${frpmdate}' AND '${todate}' `;
console.log(query);
    con.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

module.exports = router;