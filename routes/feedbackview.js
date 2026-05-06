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
let query = `
SELECT 
    f.*,
    food.food_name,

    COALESCE(s.student_name, cs.staff_name) AS customer_name,
    COALESCE(s.student_photo, cs.staff_photo) AS customer_photo,

    CASE
        WHEN s.student_id IS NOT NULL THEN 'student'
        WHEN cs.staff_id IS NOT NULL THEN 'staff'
        ELSE 'unknown'
    END AS customer_type

FROM tbl_feedback f

INNER JOIN tbl_food food 
    ON food.food_id = f.food_id

LEFT JOIN tbl_student s 
    ON s.login_id = f.customer_id

LEFT JOIN tbl_collegestaff cs 
    ON cs.login_id = f.customer_id

ORDER BY f.feedback_date DESC
`;
    con.query(query, (err, result) => { 
        if(err) throw err; 
        res.send(result); 
    }) 
});
module.exports = router;