const express  = require('express');
const { body,validationResult } = require('express-validator');
const { default: validator } = require('validator');
const router = express.Router()
const authMiddleware = require('../helpers/authMiddleware')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = require('../models/User')
require('dotenv').config()

//LOAD CONNECTED USER
router.get("/", authMiddleware, (req, res) => {
    console.log(req.user)
    res.send(req.user);
  });
// LOGIN USER
router.post("/",[
    body("email","Please enter a valid Email").isEmail(),
    body("password","Please write your password").notEmpty(),
],async (req,res)=>{
 
     const   jwtkey ="sfafsafa"
    const user = await User.findOne({ email: req.body.Email });
    //  Email Exist?
    if (user) {
 
      const passwords_compare = await bcrypt.compare(req.body.Password, user.password);
      if(passwords_compare)
      {
        
        const token = jwt.sign({ userId: user._id }, jwtkey);
         res.status(200).send({token,user});
      }
     
       else  res.status(404).send("Incorrect password");
    } else {
      res.status(404).send("Email not found");
    }
}
)
module.exports= router