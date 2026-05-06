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

    let query = `
    SELECT 
        f.*,
        COALESCE(s.student_name, cs.staff_name) AS customer_name,
        COALESCE(s.student_photo, cs.staff_photo) AS customer_photo
    FROM tbl_feedback f
    LEFT JOIN tbl_student s 
        ON s.login_id = f.customer_id
    LEFT JOIN tbl_collegestaff cs 
        ON cs.login_id = f.customer_id
    WHERE f.food_id = ?
    ORDER BY f.feedback_date DESC
    `;

    con.query(query, [food_id], (err, result) => { 
        if (err) throw err; 
        res.send(result); 
    });

});
module.exports = router;