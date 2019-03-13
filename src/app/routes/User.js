const express = require("express");
const user = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");

user.use(cors());

//NOTE: would normally store these in a file that is .gitignored, but for ease of use it's hard coded here.
process.env.SECRET = "very_secret";
const pass = "test1234";

user.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const payload = {
    email: email,
    password: password
  };

  if (password === pass) {
    let signedEmail = jwt.sign(email, process.env.SECRET);
    let token = jwt.sign(payload, process.env.SECRET, {
      //expires in One Hour
      expiresIn: 3600
    });
    res.send({
      token: token,
      expiresIn: 3600,
      signedEmail: signedEmail
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = user;
