const mongoose = require('mongoose')
const UserShema = mongoose.Schema({
    firstname:  {
        type: String,
        required: true
      },
    lastname:  {
        type: String,
        required: true
      },
    phone: Number,
    age: Number,
    email:  {
        type: String,
        required: true
      },
     password:{
    type:String,
    required:true,
    match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    minlength:5


  },
  Admin : false,
    created_at: {
        type:Date,
        default:Date.now }

})
module.exports =mongoose.model('user',UserShema);