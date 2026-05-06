var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql2'); 
var con = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "unibites" 
})
router.get('/', (req, res) => {

  const query = `
    SELECT 
      e.event_id,
      e.event_name,
      e.event_poster,
      e.event_date,
      f.eventfood_id,
      f.food_name,
      f.food_image,
      f.count
    FROM tbl_event e
    LEFT JOIN tbl_eventfood f 
      ON e.event_id = f.event_id
    ORDER BY e.event_date ASC
  `;

  con.query(query, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    const events = [];

    result.forEach(row => {

      let event = events.find(e => e.event_id === row.event_id);

      if (!event) {
        event = {
          event_id: row.event_id,
          event_name: row.event_name,
          event_poster: row.event_poster,
          event_date: row.event_date,
          foods: []
        };
        events.push(event);
      }

      if (row.eventfood_id) {
        event.foods.push({
          eventfood_id: row.eventfood_id,
          food_name: row.food_name,
          food_image: row.food_image,
          count: row.count
        });
      }

    });

    res.json(events);

  });

});
module.exports=router;