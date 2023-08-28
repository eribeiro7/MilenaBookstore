require('dotenv').config({path:'.env'});
const express = require('express');
const cors = require('cors');
const routes = require('./route');
const bodyParser = require('body-parser');
const server = express();
server.use(express.json(), bodyParser.urlencoded({extended: false}));
server.use(cors());
server.use('/api', routes);

server.listen(process.env.PORT, () =>{
    console.log(`O servidor está a rodar em http://localhost:${process.env.PORT}`);
});