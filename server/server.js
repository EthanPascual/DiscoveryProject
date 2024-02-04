const express = require('express');
const app = express();
var cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

let Players = require('./models/player.js');
let Games = require('./models/game.js')

let mongoose = require('mongoose');
let mongoDb =  "mongodb://127.0.0.1/discovery";
mongoose.connect(mongoDb, {useNewURLParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

const port = 8000;

app.use(express.json());
//SOCKET IO STUFF HERE
const server = createServer(app); 
const io = new Server(server,{
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

server.listen(port, () => {

    console.log('server running at port: '+ port)
    
})

io.on('connection', (socket) => {

    console.log("user connected, socket id: "+ socket.id)

  });


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
    console.log("connected to database")
    app.use(cors())

app.get('/users',async (req, res) => {
    let users = await Players.find();
    
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