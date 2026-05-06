var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var nodemailer = require('nodemailer');
var otpStore = require('./otpStore');   // import shared store

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});

router.post('/', (req, res) => {

    let email = req.body.email;

    con.query("SELECT * FROM tbl_login WHERE email=?", [email], (err, result) => {

        if (result.length > 0) {

            let otp = Math.floor(1000 + Math.random() * 9000);

            otpStore[email] = otp;

            console.log("OTP generated:", otp); // debug

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ajaydevv05@gmail.com',
                    pass: 'opfisadtbxhjwgvt'
                }
            });

            let mailOptions = {
                from: 'ajaydevv05@gmail.com',
                to: email,
                subject: 'UNIBITES Password Reset OTP',
                text: 'Your OTP is ' + otp
            };

            transporter.sendMail(mailOptions);

            res.send({ status: "success" });

        } else {

            res.send({ status: "error" });

        }

    });

});

module.exports = router;