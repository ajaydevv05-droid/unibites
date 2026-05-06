var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});

/* GET booking list with student/staff name */
router.get('/bookinglist', function (req, res) {

    var sql = `
        SELECT 
            bm.bookingmaster_id,
            bm.bookingdate,
            bm.totalamount,
            l.role,
            COALESCE(s.student_name, st.staff_name) AS user_name
        FROM tbl_bookingmaster bm
        JOIN tbl_login l ON bm.login_id = l.login_id
        LEFT JOIN tbl_student s ON s.login_id = l.login_id
        LEFT JOIN tbl_collegestaff st ON st.login_id = l.login_id
        ORDER BY bm.bookingmaster_id DESC
    `;

    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });

});

module.exports = router;
