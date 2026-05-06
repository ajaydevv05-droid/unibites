var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql2'); 
var con = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "unibites" 
});
router.post('/',(req, res, next) => {
let rating = req.body.rating;
let description = req.body.description;
let customer_id = req.body.login_id;
let food_id = req.body.food_id;
let feedback_date = new Date().toISOString().slice(0, 10);
let query = `INSERT INTO tbl_feedback(rating,description,customer_id,food_id,feedback_date) VALUES(?,?,?,?,?)`;

con.query(query, [rating, description, customer_id, food_id, feedback_date], (err, result) => {
    if(err) {
        console.log(err);
        res.status(500).send("Error submitting feedback ");
    } else {
        res.status(200).send({message:'success'});
    }
});
});
module.exports = router;
