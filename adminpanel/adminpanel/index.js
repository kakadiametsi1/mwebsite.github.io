const express = require('express');

const port = 8080;

const app = express();

const path = require('path');
const cookieParser = require("cookie-parser");

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');

app.use(session({
    name : "milansir",
    secret : "rnw",
    saveUninitialized : true,
    resave : true, 
    cookie : { 
        maxAge : 1000 * 60 * 60 * 100
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

const db = require('./config/mongoose');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());

app.use(express.urlencoded());

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server not start");
        return false;
    }
    console.log("Server is start on port :- "+port);
})