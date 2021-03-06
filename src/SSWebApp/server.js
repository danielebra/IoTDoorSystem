const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const authorizeDoor = require('./routes/api/AuthorizeDoor');
const users = require('./routes/api/Users');
const cards = require('./routes/api/Cards');
const rooms = require('./routes/api/Rooms');
const assignCardToUser = require('./routes/api/AssignCardToUser');
const accessManager = require('./routes/api/AccessManager');
const accessRequest = require('./routes/api/AccessRequest')
const filterRequest = require('./routes/api/FilteredRequest.js')
const app = express();

//Body Parser
app.use(bodyParser.json());

//Morgan, to show http request in console
app.use(morgan('dev'));

//Database Configuration, get MongoURI
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('database is connected to mongodb'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/authorizeDoor', authorizeDoor);
app.use('/api/users', users);
app.use('/api/cards', cards);
app.use('/api/addOwnership', assignCardToUser);
app.use('/api/accessManager', accessManager);
app.use('/api/rooms', rooms);
app.use('/api/get/accessRequests', accessRequest); // This URL may change in the future
app.use('/api/filter/', filterRequest);
app.use(express.static(__dirname));

var server = app.listen(5000, () => {
    console.log('server is listening on port', server.address().port)
})