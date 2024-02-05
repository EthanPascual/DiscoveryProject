let User = require('./models/player.js')
let Game = require('./models/game.js')
let userArgs = process.argv.slice(2);
let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function playerCreate(nameOfUser) {
    playerDetail = {
      name: nameOfUser,
      wins: 0,
      losses: 0,
      totalGuess: 0

    };
    
    let newPlayer = new User(playerDetail);
  
    return newPlayer.save();
  }

  function gameCreate(game) {
    gameDetail = {

      player: [],

    };
    
    let newGame = new Game(gameDetail);
  
    return newGame.save();
  }

  function gameCreateFull(player1, player2, date, players) {
    gameDetail = {
      winner: player1,
      loser: player2,
      date: date,
      player: players

    };
    
    let newGame = new Game(gameDetail);
  
    return newGame.save();
  }


const populate = async () => {
    let p1 = await playerCreate("Tester 1");
    let p2 = await playerCreate("Tester 2");
    await gameCreate("Test")
    await gameCreateFull(p1, p2, new Date(), [p1, p2]);
    if(db){
        db.close();
    }

    console.log("done!")

}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if (db) db.close();
  });