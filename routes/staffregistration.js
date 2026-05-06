var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var nodemailer=require('nodemailer');
var con=mysql.createConnection({
  host:"localhost",
  user:"root",      
  password:"",
  database:"unibites"
});
router.post('/',(req, res, next) => {
    let staffname = req.body.staffName;
  let staffimage = req.body.staffImage;
  let email = req.body.email;
  let contact = req.body.contact;
  let username = req.body.username;
  let password = req.body.password;

  let role = "staff";
  let regdate = new Date().toISOString().slice(0, 10);

  // ✅ USE PARAMETERIZED QUERY (important)
  let checkQuery = `SELECT * FROM tbl_collegestaff WHERE staff_name=?`;

  con.query(checkQuery, [staffname], (err, rows) => {
    if (err) return res.status(500).send(err);

    if (rows.length > 0) {
      return res.send({ message: 'failed' });
    }

    // Insert into tbl_login
    let loginSql = `INSERT INTO tbl_login(username,password,role,status,email) VALUES(?,?,?,?,?)`;

    con.query(loginSql, [username, password, role, 'accepted',email], (err, result) => {
      if (err) return res.status(500).send(err);

      let loginid = result.insertId;

      // Insert into tbl_collegestaff
      let staffSql = `
        INSERT INTO tbl_collegestaff
        (staff_name,staff_photo,staff_email,staff_contact,login_id,reg_date,status)
        VALUES(?,?,?,?,?,?,?)
      `;

      con.query(
        staffSql,
        [staffname, staffimage, email, contact, loginid, regdate, 'accepted'],
        (err) => {

          if (err) return res.status(500).send(err);

          // ✅ Create transporter
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "ajaydevv05@gmail.com",
              pass: "opfisadtbxhjwgvt" // use env variable in production
            }
          });

          const mailOptions = {
            from: '"UniBites Team 🍽️" <ajaydevv05@gmail.com>',
            to: email,
            subject: "🎉 Welcome to UniBites – Staff Registration Successful!",
            html: `
              <div style="font-family: Arial; padding: 20px;">
                <h2 style="color:#ff6b00;">Welcome to UniBites 🍔</h2>
                <p>Hello <b>${staffname}</b>,</p>
                <p>
                  🎉 Your staff account has been successfully created.
                </p>
                <p>
                  You can now manage food services, monitor orders,
                  and access your UniBites dashboard.
                </p>
                <hr>
                <p><b>Username:</b> ${username}</p>
                <p><b>Registered Email:</b> ${email}</p>
                <br>
                <p style="color:gray;">
                  If this registration was not done by you,
                  please contact the administrator immediately.
                </p>
                <br>
                <p>
                  Regards,<br>
                  <b>Team UniBites</b>
                </p>
              </div>
            `
          };

          // Send Mail
          transporter.sendMail(mailOptions, (mailErr, info) => {
            if (mailErr) {
              console.log("Mail Error:", mailErr);
            } else {
              console.log("Mail Sent:", info.response);
            }
          });

          res.send({ message: 'success' });
        }
      );
    });
  });
});

module.exports = router;