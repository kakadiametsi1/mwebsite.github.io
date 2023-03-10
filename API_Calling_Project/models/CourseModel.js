const mongoose = require('mongoose');
const faculty = require('./FacultyModel');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fees : {
        type: String,
        required: true
    },
    duration : {
        type: String,
        required: true
    },
    facultyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "faculty"
    }
});

const course = mongoose.model('course', schema);
module.exports = course;