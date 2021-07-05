const express = require('express')
const router =express.Router()
const { body, validationResult } = require("express-validator");
const User =require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

//REGISTER USER
router.post("/",[
    body("firstname","Firstname must contain only alphabetic").isAlpha(),
    body("lastname","Lastname must contain only alphabetic").isAlpha(),
    body("phone","Phone must contain only number").isNumeric(),
    body("age","Age must contain only number").isNumeric(),
    body("email","Please enter a valid Email").isEmail(),
    body("password","PassWord must contain length entre 5 & 10").isLength({ min:5, max:10 })
],async (req,res)=>{


    const mail_isExist = await User.findOne({ email: req.body.email });
     
    if(mail_isExist)
    {
        res.status(404).send("Email already exist");
        return
    }

    const hashPassowrd = await bcrypt.hash(req.body.password, 10);
    try {
      const user = new User({ 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        age: req.body.age,
        email: req.body.email,
        password: hashPassowrd,
        });
       
      await user.save();
      return res.status(200).send(user);
      
    } catch (err) {
      return res.status(422).send(err.message);
    }
}
);
module.exports = router;