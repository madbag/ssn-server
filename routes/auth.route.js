const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js"); 

const router = express.Router();
const saltRounds = 10;

//POST /auth/signup 
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400)
    .json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address" });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least 1 number, 1 lowercase, and 1 uppercase letter. ",
    });
    return;
  }

  //check the users collection if a user with the same email id already exists
  User.findOne({ email })
    .then((foundUser) => {
      //if the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(500)
        .json({ message: "Email is taken" });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      //deconstruct the newly created user object to omit the password
      const { email, name, _id } = createdUser;
      const user = { email, name, _id };
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

//POST /Auth/login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
 
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        //if the user is not found, send an error response
        res.status(401).json({ message: "User not found" });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name } = foundUser;

        const payload = { _id, email, name };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

// GET /auth/verify 
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

//Post /Auth/logout
router.post('/logout', isAuthenticated, (req, res, next) => {
  res.status(200).json({ message: 'User logged out successfully' });
})

module.exports = router;
