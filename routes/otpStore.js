
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var con=mysql.createConnection({
  host:"localhost",
  user:"root",      
  password:"",
  database:"unibites"
});

let otpStore = {};

module.exports = otpStore;