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
  let food_id = req.body.food_id;
  let quantity = req.body.quantity;
  let totalprice = req.body.totalprice;
   let date = new Date().toISOString().slice(0, 10);
  let loginid = req.body.loginid;
  let query = `select * from tbl_bookingdetails where food_id='${food_id}' and id='${loginid}' and bookingmaster_id=0`;
  console.log(query)
  con.query(query, (err, rows) => {
    if (err) throw err;
    if (rows == "") {
      let sql = `INSERT INTO tbl_bookingdetails(bookingmaster_id,food_id,quantity,amount
    ,id) VALUES(?,?,?,?,?)`;
      console.log(sql, [0, food_id, quantity, totalprice, loginid]);
      con.query(sql, [0, food_id, quantity, totalprice, loginid], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Success' })

      });

    }
    else {
      res.send({ message: 'failed' })
    }
  });
});
module.exports = router;