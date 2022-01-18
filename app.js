var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var logger = require('morgan');
const cors = require('cors')

var queueRouter = require('./routes/queue.route');

var app = express();

const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/songqueueapp';

module.exports = (() => {
    mongoose.connect(url, {})
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', async function () {
        console.log(`We are connected on Port:${db.port} to Database:${db.name}`)
    });
})();

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', [ queueRouter ]);

// Handle SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app;
