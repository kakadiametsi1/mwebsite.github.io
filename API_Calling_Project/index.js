const express = require('express');

const port = 9000;

const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const db = require('./config/mongoose');

const passportJwt = require('./config/passport-jwt-strategy');

const session = require('express-session');

app.use(session({
    name : "api-calling",
    secret : "METSI",
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000*60*60*100
    }
}))

app.use(express.urlencoded());

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server not start")
        return false
    }
    console.log("Server started on port :- "+port);
})