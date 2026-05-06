var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql2'); 

var con = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "unibites" 
});

con.connect((err)=>{
    if(err){
        console.log("DB Connection Failed",err);
    }else{
        console.log("DB Connected");
    }
});


/* ================= EVENT RESULTS (TOP 3 FOODS) ================= */

router.get('/', (req, res) => {

    let sql = `
        SELECT 
            e.event_id,
            e.event_name,
            e.event_date,
            ef.food_name,
            ef.count
        FROM tbl_event e
        JOIN tbl_eventfood ef ON e.event_id = ef.event_id
        WHERE e.event_date < CURDATE()
        ORDER BY e.event_id ASC, ef.count DESC
    `;

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.send({ success: false });
        }

        let grouped = {};

        result.forEach(row => {

            if (!grouped[row.event_id]) {
                grouped[row.event_id] = {
                    event_id: row.event_id,
                    event_name: row.event_name,
                    event_date: row.event_date,
                    foods: []
                };
            }

            grouped[row.event_id].foods.push({
                food_name: row.food_name,
                count: row.count
            });

        });

        // TAKE TOP 3
        let finalData = Object.values(grouped).map(event => {

            return {
                event_id: event.event_id,
                event_name: event.event_name,
                event_date: event.event_date,
                topFoods: event.foods.slice(0, 3)
            };

        });

        res.send({
            success: true,
            data: finalData
        });

    });

});

module.exports = router;