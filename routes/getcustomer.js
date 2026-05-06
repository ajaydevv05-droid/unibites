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
    let bookingmaster_id = req.body.bookingmaster_id;
    let query = `select * from tbl_bookingmaster m inner join tbl_login l on m.id=l.login_id where m.bookingmaster_id=${bookingmaster_id}`;
    con.query(query, (err, rows) => {
        console.log(query);
        if (err)
            throw err;
        let role = rows[0].role;
        if(role == 'student') {
            let query1 = `select s.student_name as name,s.student_photo as image,l.role,m.bookingdate,m.status from tbl_student s inner join tbl_login l on s.login_id=l.login_id inner join tbl_bookingmaster m on m.id=l.login_id where s.login_id=${rows[0].login_id} and m.bookingmaster_id=${bookingmaster_id}`;
            con.query(query1, (err, rows1) => {
                if (err)
                    throw err;
                res.send(rows1);
            });
        } else if(role == 'staff') {
            let query1 = `select st.staff_name as name,st.staff_photo as image,l.role,m.bookingdate,m.status from tbl_collegestaff st inner join tbl_login l on st.login_id=l.login_id inner join tbl_bookingmaster m on m.id=l.login_id where st.login_id=${rows[0].login_id} and m.bookingmaster_id=${bookingmaster_id}`;
            con.query(query1, (err, rows1) => {
                if (err)
                    throw err;
                res.send(rows1);
            });
        }
        // res.send(rows1);
    });
});
module.exports = router;