// run command: npm start

// EXPRESS SETUP ------------------------------------------------------------------------

const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());

// UDP CLIENT ------------------------------------------------------------------------

var PORT = 2000;
var HOST = '127.0.0.1';

var dgram = require('dgram');

var client = dgram.createSocket('udp4');

// HTTP SERVER ------------------------------------------------------------------------

app.listen(3000, () => {
    console.log('Server started!')
})

app.route('/').post((req, res) => {
    console.log(req.body.message);
    res.sendStatus(200);
    var message = new Buffer.from(req.body.message);
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
      });
})




