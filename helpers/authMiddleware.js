const jwt= require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')
 
module.exports = (req,res,next)=>{
    const { authorization } = req.headers;
    console.log(authorization)
   const jwtkey = "sfafsafa"
    //authorization === Bearer sfafsafa
    if(!authorization){
        return res.status(401).send({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,jwtkey,async (err,payload)=>{
        if(err){
          return  res.status(401).send({error:"you must be logged in 2"})
        }
     const {userId} = payload;
     const user = await User.findById(userId)
     req.user=user;
     next();
    })
}