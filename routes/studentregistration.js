var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var nodemailer = require('nodemailer');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unibites"
});

router.post('/', (req, res, next) => {

   let studentname = req.body.studentname;
  let studentimage = req.body.studentImage;
  let studentemail = req.body.studentemail;
  let studentcontact = req.body.studentcontact;
  let username = req.body.username;
  let password = req.body.password;

  let role = "student";
  let regdate = new Date().toISOString().slice(0, 10);

  let checkQuery = `SELECT * FROM tbl_student WHERE student_name=?`;

  con.query(checkQuery, [studentname], (err, rows) => {
    if (err) return res.status(500).send(err);

    if (rows.length > 0) {
      return res.send({ message: "failed" });
    }

    // Insert into tbl_login
    let loginSql = `INSERT INTO tbl_login(username,password,role,status,email) VALUES(?,?,?,?,?)`;

    con.query(loginSql, [username, password, role, 'accepted',studentemail], (err, result) => {
      if (err) return res.status(500).send(err);

      let loginid = result.insertId;

      // Insert into tbl_student
      let studentSql = `INSERT INTO tbl_student
      (student_name,student_photo,student_email,student_contact,login_id,date,status)
      VALUES(?,?,?,?,?,?,?)`;

      con.query(studentSql,
        [studentname, studentimage, studentemail, studentcontact, loginid, regdate, 'accepted'],
        async (err) => {

          if (err) return res.status(500).send(err);

          // ✅ Create transporter ONLY ONCE
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "ajaydevv05@gmail.com",
              pass: "opfisadtbxhjwgvt" // Use env variable in production
            }
          });

          const mailOptions = {
            from: '"UniBites Team 🍽️" <ajaydevv05@gmail.com>',
            to: studentemail,  // ✅ FIXED VARIABLE
            subject: "🎉 Welcome to UniBites – Registration Successful!",
            html: `
              <div style="font-family: Arial; padding: 20px;">
                <h2 style="color:#ff6b00;">Welcome to UniBites 🍔</h2>
                <p>Hello <b>${studentname}</b>,</p>
                <p>
                  🎉 Your registration has been successfully completed.
                </p>
                <p>
                  You can now explore delicious meals, place orders, 
                  and enjoy seamless canteen services.
                </p>
                <hr>
                <p><b>Username:</b> ${username}</p>
                <p><b>Registered Email:</b> ${studentemail}</p>
                <br>
                <p style="color:gray;">
                  If you did not register, please contact support immediately.
                </p>
                <br>
                <p>
                  Regards,<br>
                  <b>Team UniBites</b>
                </p>
              </div>
            `
          };

          // Send mail
          transporter.sendMail(mailOptions, (mailErr, info) => {
            if (mailErr) {
              console.log("Mail Error:", mailErr);
            } else {
              console.log("Mail Sent:", info.response);
            }
          });

          res.send({ message: "success" });
        }
      );
    });
  });
});

module.exports = router;