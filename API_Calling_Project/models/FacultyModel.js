const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
});

const faculty = mongoose.model('faculty',schema);
module.exports = faculty;