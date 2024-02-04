const mongoose = require('mongoose')
const {Schema, model}= mongoose;

const gameSchema = new Schema({
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    loser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    date: {
        type: Date,
        default: new Date()
    }
});


gameSchema.virtual('url').get(()=>{
   return `games/${this._id}`
})


module.exports= model('Game', gameSchema)