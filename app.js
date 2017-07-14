const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');
require('./config/passport')(passport);

mongoose.connect(config.db);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' +config.db);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error' + err);
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 8080;

app.use(cors());

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyPaser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
