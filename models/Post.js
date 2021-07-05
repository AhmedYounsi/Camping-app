const mongoose = require('mongoose')
const PostShema = mongoose.Schema({
    // owner:{
    //     type: mongoose.Types.ObjectId,
    //     ref:"user"
    // },
    img : String,
    owner : String,
    owner_id : String,
    likes: [],

    title: String,
    description: String,
    created_at: {
        type:Date,
        default:Date.now }

})
module.exports =mongoose.model('Post',PostShema);