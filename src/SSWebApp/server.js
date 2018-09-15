const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const doorHistories = require('./routes/api/DoorHistories')
const authorizeDoor = require('./routes/api/AuthorizeDoor')
const users = require('./routes/api/Users')
const cards = require('./routes/api/Cards')
const app = express();

//Body Parser
app.use(bodyParser.json());

//Morgan, to show the process of post,get or delete request
app.use(morgan('dev'));

//Database Configuration, get MongoURI
const db = require('./config/keys').mongoURI;

//Error handling of requests
app.use((req,res,next)=> {
    const error = new Error('Not found');
    error.status(404);
    next(error);
})

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

//Database connection
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('database is connected to mongodb'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/doorHistories', doorHistories);
app.use('/api/authorizeDoor', authorizeDoor);
app.use('/api/users', users);
app.use('/api/cards', cards);

app.use(express.static(__dirname));

var server = app.listen(5000, () => {
    console.log('server is listening on port', server.address().port)
})