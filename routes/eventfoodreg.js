var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unibites"
});
router.post('/', (req, res, next) => {
    let foodName = req.body.food_name;
    let event_id = req.body.event_id;
    let food_image = req.body.food_image;
    let regdate = new Date().toISOString().slice(0, 10);
    let query = `select * from tbl_eventfood where food_name='${foodName}'and event_id='${event_id}'`;
    con.query(query, (err, rows) => {
        if (err) throw err;
        if (rows == "") {
            let sql = `INSERT INTO tbl_eventfood(event_id,food_name,food_image,count) VALUES(?,?,?,?)`;
            con.query(sql, [event_id, foodName, food_image, 0], (err, result) => {
                if (err) throw err;
                res.send({ message: 'success' })
            });
        }
        else {
            res.send({ message: 'failed' })
        }
    });
});
module.exports = router;