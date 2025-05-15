const express = require("express");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const { body, validationResult } = require("express-validator");
//
//
//for creating a user
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password length must be greater than 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors occur, send them as a response
      return res.status(400).json({ errors: errors.array() });
    }
    jwt_secret = "Shaheer@123";
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const Secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: Secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, jwt_secret);
      res.json({ token });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "kuch to garbar hai" });
    }
  }
);
//
//
//
//to login the user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors occur, send them as a response
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //validation starts here
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Incorrect email or password" });
      }
      const comparison = await bcrypt.compare(password, user.password);
      if (!comparison) {
        return res.status(400).json({ error: "Incorrect email or password" });
      }
      //before this line, checking and vlaidation is done
      //
      //sending data to jwt
      const data = {
        user: {
          id: user.id,
        },
      };
      jwt_secret = "Shaheer@123";
      var token = jwt.sign(data, jwt_secret);
      res.json({ token });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "login men garbar hai" });
    }
  }
);
//
//
//
//for getting user details after login
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "login data laane men garbar hai" });
  }
});

module.exports = router;
