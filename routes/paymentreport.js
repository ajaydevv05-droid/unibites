var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});
router.post('/', function(req, res) {

  let startdate = req.body.startdate;
  let enddate = req.body.enddate;

  let qry = `
    SELECT 
        p.*,

        -- Customer Name (Student or Staff)
        COALESCE(s.student_name, cs.staff_name) AS customer_name,

        -- Customer Email (Student or Staff)
        COALESCE(s.student_email, cs.staff_email) AS customer_email,
         CASE
        WHEN s.student_id IS NOT NULL THEN 'student'
        WHEN cs.staff_id IS NOT NULL THEN 'staff'
        ELSE 'unknown'
    END AS customer_type

    FROM tbl_payment p

    LEFT JOIN tbl_student s 
        ON p.id = s.login_id

    LEFT JOIN tbl_collegestaff cs 
        ON p.id = cs.login_id
       


    WHERE p.paymentdate BETWEEN ? AND ? and p.status='completed' or p.status='Paid'
  `;

  con.query(qry, [startdate, enddate], (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(row);
    }
  });

});
module.exports = router;