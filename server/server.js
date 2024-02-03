const express = require('express');
const app = express();
var cors = require('cors');


let mongoose = require('mongoose');
let mongoDb =  "mongodb://127.0.0.1/discovery";
mongoose.connect(mongoDb, {useNewURLParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

const port = 8000;

app.listen(port, () => {
    console.log('Discovery listening on port ${port}')
})

const genName = () => {

    //Create algo for generating a name for user without cookie

}

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
    console.log("connected to database")

app.get('/cookie', (req, res) => {
    let playerName = req.cookies.playerName;
    
    if (!playerName) {
        playerName = genName();
        res.cookie(
            'playerName',
            playerName, 
            { maxAge: 365 * 24 * 60 * 60 * 1000 });
    }
    
    res.json({ playerName });
});




})