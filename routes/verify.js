var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var otpStore = require('./otpStore');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "unibites"
});

router.post('/', (req, res) => {

    let email = req.body.email;
    let otp = req.body.otp;
    let password = req.body.password;

    if (otpStore[email] == otp) {

        con.query(
            "UPDATE tbl_login SET password=? WHERE email=?",
            [password, email],
            (err, result) => {

                if (err) {
                    res.send({ status: "error" });
                } else {

                    delete otpStore[email]; // remove OTP after use

                    res.send({ status: "success" });
                }
            }
        );

    } else {

        res.send({ status: "invalid_otp" });

    }

});

module.exports = router;