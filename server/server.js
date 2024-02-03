const express = require('express');
const app = express();
var cors = require('cors');

let Players = require('./models/player.js');

let mongoose = require('mongoose');
let mongoDb =  "mongodb://127.0.0.1/discovery";
mongoose.connect(mongoDb, {useNewURLParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

const port = 8000;

app.use(express.json());
app.listen(port, () => {
    console.log('Discovery listening on port ' + port)
})

const genName = () => {

    //Create algo for generating a name for user without cookie

}



db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
    console.log("connected to database")
    app.use(cors())
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

app.get('/users',async (req, res) => {
    let users = await Players.find();
    console.log(users);
    res.send(users);
});

app.post('/newUsers', async (req, res) => {
    console.log('Received request body:', req.body);

    const newUser = new Players({
        name: req.body.UserName,
        wins: 0,
        losses: 0,
        totalGuess: 0
    });

    await newUser.save();
    res.send("New User added!");
})





});