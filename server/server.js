const express = require('express');
const app = express();
var cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

let Players = require('./models/player.js');
let Games = require('./models/game.js')

let mongoose = require('mongoose');
let mongoDb =  "mongodb://127.0.0.1/discovery";
mongoose.connect(mongoDb);
let db = mongoose.connection;

const port = 8000;

app.use(cors());

app.use(express.json());

//SOCKET IO STUFF HERE
const server = createServer(app); 
const io = new Server(server,{
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

server.listen(port, () => {

    console.log('server running at port: '+ port)

});

let gameRooms = new Map();
let waitingPlayer = null;

io.on('connection', (socket) => {
    console.log('🔥: user ' + socket.id + ' connected');
  
    socket.on('findGame', () => {
        console.log("finding game");
        if (waitingPlayer != null) {
            console.log("You are matched with: " + waitingPlayer.id)
            
            const roomID = waitingPlayer.id + '#' + socket.id;
            const starts = Math.random() < 0.5 ? waitingPlayer.id : socket.id;

            gameRooms.set(roomID, { players: [waitingPlayer, socket], turn: starts });
            waitingPlayer.join(roomID);
            socket.join(roomID);

            io.to(roomID).emit('gameStart', { starts });
            io.to(roomID).emit('turn', { turn: starts });

            waitingPlayer = null;
        } else {
            console.log("You are the waiting player" + socket.id)
            waitingPlayer = socket;
            waitingPlayer.emit('message', 'Waiting for an opponent');
        }
    });
    

    socket.on('disconnect', () => {
        console.log('🔥: user ' + socket.id + ' disconnected');
        let roomToDelete = null;

        gameRooms.forEach((game, roomID) => {
            if (game.players.some(player => player.id === socket.id)) {
                socket.to(roomID).emit('message', 'Your opponent has disconnected');
                roomToDelete = roomID;
            }
        });

        if (roomToDelete) {
            gameRooms.delete(roomToDelete);
        }

        if (waitingPlayer === socket) {
            waitingPlayer = null;
        }
    });

    socket.on('message', (message) => {
        console.log('📩: message received: ' + message);

        for (let [roomID, players] of gameRooms) {
            if (players.includes(socket)) {
                socket.to(roomID).emit('message', message);
                break;
            }
        }
    });

    socket.on('guess', (guess) => {
        for (let [roomID, game] of gameRooms.entries()) {
            if (game.players.includes(socket) && game.turn === socket.id) {
                game.turn = game.players.find(player => player.id !== socket.id).id;

                console.log(game.turn, "turn");
                io.to(roomID).emit('turn', game.turn);
                socket.to(roomID).emit('opponentGuess', guess);
                break;
            }
        }
    });

    socket.on('gameEnd', () => { //ending the game for everyone
        console.log("The Game has Ended");
        for (let [roomID, players] of gameRooms) {
            if (players.includes(socket)) {
                socket.to(roomID).emit('gameEnd');
                socket.leave(roomID);
                const otherPlayerSocket = players.find(playerSocket => playerSocket !== socket);
                otherPlayerSocket.leave(roomID);

                gameRooms.delete(roomID);

                break;
            }
        }
    });

    socket.on('createdWord', (word) => {
        console.log('Chosen Word: ' + word);
        socket.emit('createdMessage', word);
    })

  });



db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
    console.log("connected to database")
});

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
    });

app.get('/games',async (req, res) => {
        try {
            //const games = await Games.find().populate(['players']);
            const games = Array.from(gameRooms, ([roomID, gameData]) => ({
                roomID,
                players: gameData.players.map(player => player.id),
                turn: gameData.turn,
            }));
            res.json({games});
        } catch (error) {
            console.error('error getting games:', error);
            res.status(500).json({ error: 'Error' });
        }
    });
