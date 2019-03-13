const express = require("express");
const user = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");

user.use(cors());

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
    let token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 1800
    });
    res.send({
      token: token,
      expiresIn: 1800
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = user;
