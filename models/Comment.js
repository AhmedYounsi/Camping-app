const mongoose = require('mongoose')
const CommentShema = mongoose.Schema({
    // owner:{
    //     type: mongoose.Types.ObjectId,
    //     ref:"user"
    // },
post_id : String ,
comment : []


})
module.exports =mongoose.model('Comment',CommentShema);