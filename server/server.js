const express = require('express');
const app = express();
var cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const axios = require('axios');

let Players = require('./models/player.js');
let Games = require('./models/game.js')

let mongoose = require('mongoose');
let mongoDb = "mongodb://127.0.0.1/discovery";
mongoose.connect(mongoDb, { useNewURLParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

const port = 8000;

app.use(cors());

app.use(express.json());

//SOCKET IO STUFF HERE
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

server.listen(port, () => {

    console.log('server running at port: ' + port)

});

let gameRooms = new Map();
let waitingPlayer = null;
let player2 = null;

io.on('connection', (socket) => {
    console.log('user ' + socket.id + ' connected');

    socket.on('findGame', (userParam) => {
        console.log(userParam); // user object
        console.log("finding game");
        if (waitingPlayer != null) {
            console.log("You are matched with: " + waitingPlayer.id)
            
            const roomID = waitingPlayer.id + '#' + socket.id;
            const starts = Math.random() < 0.5 ? waitingPlayer.id : socket.id;

            gameRooms.set(roomID, { players: [waitingPlayer, socket], turn: starts });
            waitingPlayer.join(roomID);
            socket.join(roomID);
            axios.post("http://localhost:8000/newGames", {
                name1: userParam,
                name2: player2
            });
            waitingPlayer = null;
            console.log('starts: ' + starts);
            io.to(roomID).emit('gameStart', starts);
        } else {

            console.log("You are the waiting player")
            waitingPlayer = socket;
            player2 = userParam;
            waitingPlayer.emit('message', 'Waiting for an opponent');
        }
    });


    socket.on('disconnect', () => {
        console.log('user ' + socket.id + ' disconnected');
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
        console.log('message: ' + message);

        for (let [roomID, players] of gameRooms) {
            if (players.players.includes(socket)) {
                socket.to(roomID).emit('message', message);
                break;
            }
        }
    });

      socket.on('guess', (guess, userParam) => {
        for (let [roomID, game] of gameRooms.entries()) {
            if (game.players.includes(socket) && game.turn === socket.id) {
                game.turn = game.players.find(player => player.id !== socket.id).id;
                axios.put(`http://localhost:8000/updateGuess`, {
                    userName: userParam
                });
                console.log(game.turn, "turn");
                io.to(roomID).emit('turn', game.turn);
                socket.to(roomID).emit('opponentGuess', guess);
                break;
            }
        }
    });


    socket.on('count', (data) => {
        console.log(`Count received: ${data}`);
        for (let [key, game] of gameRooms.entries()) {
            if (game.players.includes(socket)) {
                socket.to(key).emit('count', data);
                break;
            }
        }
    });


    socket.on('gameEnd', (winningUser) => { //ending the game for everyone
        console.log("The Game has Ended");
        console.log(winningUser);
        for (let [roomID, players] of gameRooms) {
            if (players.players.includes(socket)) {
                axios.put(`http://localhost:8000/updateGame`, {
                    winner: winningUser
                });
                socket.to(roomID).emit('gameEnd');
                socket.leave(roomID);
                const otherPlayerSocket = players.players.find(playerSocket => playerSocket !== socket);
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

    app.get('/users', async (req, res) => {
        let users = await Players.find();

        res.send(users);
    });

    app.get('/gamesAllInfo', async (req, res) => {

        let games = await Games.find();

        res.send(games);


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

    app.post('/newGames', async (req, res) => {

        console.log("Received Game Players: ", req.body);

        let p1 = await Players.findOne({ name: req.body.name1 });
        let p2 = await Players.findOne({ name: req.body.name2 });

        console.log(p1);
        console.log(p2);

        const newGame = new Games({

            date: new Date(),
            players: [p1, p2]
        })

        await newGame.save();
        res.send("New Game Added!");

    });

    app.get('/games', async (req, res) => {
        try {
            const games = await Games.find().populate(['players']);

            res.json(games);
        } catch (error) {
            console.error('error getting games:', error);
            res.status(500).json({ error: 'Error' });
        }
    });

    app.put('/updateGame', async (req, res) => {
        
        
        console.log('Received request updated body:', req.body);

        let playerWin = await Players.findOne({ name: req.body.winner })

        let gameUpdate = await Games.findOne({ 
            'players': { $in: [playerWin] },
            winner: { $exists: false } 
        });

        let playerLoseId = gameUpdate.players.find(playerId => playerId.toString() !== playerWin._id.toString());
        let playerLose = await Players.findById(playerLoseId);

        playerWin.wins += 1;
        playerLose.losses += 1;

        await playerWin.save();
        await playerLose.save();

        gameUpdate.winner = playerWin;
        gameUpdate.loser = playerLose;


        await gameUpdate.save();

        res.send("Game Updated!");

       
    });

    app.put('/updateGuess', async (req, res) => {

        console.log('Received requested user to update body:', req.body);

        let player = await Players.findOne({name: req.body.userName});

        player.totalGuess += 1;

        await player.save();

        res.send("Guess Updated!");
    });

