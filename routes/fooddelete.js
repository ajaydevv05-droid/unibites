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

    var id = req.body.food_id;

    console.log("Deleting ID:", id);

    let query = "DELETE FROM tbl_food WHERE food_id = ?";

    con.query(query, [id], (err, result) => { 

        if (err) {
            console.log(err);
            return res.send({ message: 'error' });
        }

        if (result.affectedRows > 0) {
            res.send({ message: 'Success' });
        } else {
            res.send({ message: 'Not Found' });
        }

    }); 
}); 

module.exports = router;