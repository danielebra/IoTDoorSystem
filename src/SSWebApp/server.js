const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//Body Parser
app.use(bodyParser.json());

//Database Configuration, get MongoURI
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('database is connected to mongodb'))
    .catch(err => console.log(err));

app.use(express.static(__dirname))
var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})