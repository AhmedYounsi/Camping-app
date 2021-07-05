const { stringify } = require('circular-json');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const publicationSchema = new mongoose.Schema({
    content: { type: String },
    user: {
    type: Schema.Types.ObjectId,

    
    ref: 'user'
  },
  comment:[
    { writer: {
        type: Schema.Types.ObjectId,
        ref: 'user'
  }, 
  
  content: {
      type: String
  }}
  ], 
    name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Publication', publicationSchema);