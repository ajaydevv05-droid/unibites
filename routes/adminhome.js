var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});

router.get('/', (req,res)=>{

let dashboard = {};

// TOTAL ORDERS
con.query(
"SELECT COUNT(*) AS totalOrders FROM tbl_bookingmaster",
(err,orders)=>{

dashboard.totalOrders = orders[0].totalOrders;


// TOTAL REVENUE
con.query(
"SELECT SUM(totalamount) AS totalRevenue FROM tbl_bookingmaster",
(err,revenue)=>{

dashboard.totalRevenue = revenue[0].totalRevenue || 0;


// TOTAL USERS
con.query(
"SELECT COUNT(*) AS totalUsers FROM tbl_login",
(err,users)=>{

dashboard.totalUsers = users[0].totalUsers;


// TODAY ORDERS
con.query(
"SELECT COUNT(*) AS todayOrders FROM tbl_bookingmaster WHERE DATE(bookingdate)=CURDATE()",
(err,today)=>{

dashboard.todayOrders = today[0].todayOrders;


// TOP FOODS
con.query(
`SELECT f.food_name,
SUM(d.quantity) AS total_qty
FROM tbl_bookingdetails d
JOIN tbl_food f ON f.food_id = d.food_id
GROUP BY d.food_id
ORDER BY total_qty DESC
LIMIT 5`,
(err,foods)=>{

dashboard.topFoods = foods;


// LATEST ORDERS (FIXED)
con.query(
`SELECT 
bm.bookingmaster_id AS booking_id,
bm.bookingdate,
bm.totalamount AS total,
l.username AS name
FROM tbl_bookingmaster bm
JOIN tbl_login l ON l.login_id = bm.id
ORDER BY bm.bookingmaster_id DESC
LIMIT 5`,
(err,orders)=>{

dashboard.latestOrders = orders;


// SALES CHART
con.query(
`SELECT DATE_FORMAT(bookingdate, '%Y-%m') AS month,
SUM(totalamount) AS total
FROM tbl_bookingmaster
GROUP BY DATE_FORMAT(bookingdate, '%Y-%m')
ORDER BY DATE_FORMAT(bookingdate, '%Y-%m')`,
(err,sales)=>{

dashboard.salesChart = sales;


// CATEGORY SALES
con.query(
`SELECT c.category_name,
SUM(d.quantity) AS total
FROM tbl_bookingdetails d
JOIN tbl_food f ON f.food_id=d.food_id
JOIN tbl_category c ON c.category_id=f.category_id
GROUP BY c.category_name`,
(err,cat)=>{

dashboard.categorySales = cat;


// MONTHLY SALES
con.query(
`SELECT DATE_FORMAT(bookingdate,'%b') AS month,
SUM(totalamount) AS total
FROM tbl_bookingmaster
GROUP BY MONTH(bookingdate)`,
(err,month)=>{

dashboard.monthlySales = month;


// ORDER STATUS
con.query(
`SELECT status,COUNT(*) AS total
FROM tbl_bookingmaster
GROUP BY status`,
(err,status)=>{

dashboard.orderStatus = status;

res.send(dashboard);

});

});
});
});
});
});
});
});
});
});
});
module.exports = router;