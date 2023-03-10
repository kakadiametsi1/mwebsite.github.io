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
    facultyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "faculty"
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'course'
    }
    
});



const student = mongoose.model('student',schema);
module.exports = student;