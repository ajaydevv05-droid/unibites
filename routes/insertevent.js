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
    let eventName = req.body.eventName;
    let eventDate = req.body.eventDate;
    let eventPoster = req.body.eventPoster;
    let regdate = new Date().toISOString().slice(0, 10);
    let query = `select * from tbl_event where event_name='${eventName}' and event_date='${eventDate}'`;
    con.query(query, (err, rows) => {
        if (err) throw err;
        if (rows == "") {
            let sql = `INSERT INTO tbl_event(event_name,event_date,event_poster,reg_date) VALUES(?,?,?,?)`;
            con.query(sql, [eventName, eventDate, eventPoster, regdate], (err, result) => {
                if (err) throw err;
                let event_id = result.insertId;
                res.send({ message: 'success', event_id: event_id })
            });
        }
        else {
            res.send({ message: 'failed' })
        }
    });
});
module.exports = router;