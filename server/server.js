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

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
    console.log("connected to database")
    })