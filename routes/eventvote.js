var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unibites"
});
router.post('/', (req, res) => {

  const { eventfood_id } = req.body;

  if (!eventfood_id) {
    return res.status(400).json({ message: "Food ID missing" });
  }

  const updateQuery = `
    UPDATE tbl_eventfood
    SET count = count + 1
    WHERE eventfood_id = ?
  `;

  con.query(updateQuery, [eventfood_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Vote failed" });
    }

    res.json({ message: "Vote successful" });

  });

});
module.exports=router;