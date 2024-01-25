const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");



router.post("/register", async (req, res) => {
    try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
    });
    const user = await newUser.save(); res.status(200).json(user);
    } catch (err) {
    res.status(500).json(err);
    }
    });


    //login
    router.post("/login", async (req, res) => {
        try {
          const foundUser = await User.findOne({ username: req.body.username });
      
          if (!foundUser) {
            return res.status(400).json("Wrong credentials");
          }
      
          const validated = await bcrypt.compare(req.body.password, foundUser.password);
      
          if (!validated) {
            return res.status(400).json("Wrong credentials");
          }
      
          // Only send the user data if the credentials are correct
          res.status(200).json(foundUser);
        } catch (err) {
          console.error(err);
          res.status(500).json("Internal Server Error");
        }
      });    


    module.exports = router;