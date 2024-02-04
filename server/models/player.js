const mongoose = require('mongoose')
const {Schema, model}= mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
   wins: {
       type: Number,
       required: true,
   },
   losses:{
       type: Number,
       required: true,
   },
   totalGuess:{
       type: Number,
       default: 0
   },
});


playerSchema.virtual('url').get(()=>{
   return `player/${this._id}`
})


module.exports= model('Player', playerSchema)