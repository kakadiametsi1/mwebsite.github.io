const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role :{
        type : String,
        required : true,
        enum : ["faculty","student"]
    }

});

registerSchema.pre('save', function (next) {
    if (this.isModified('role') && this.role !== 'faculty') {
      const err = new Error('Only faculty members can create new user accounts');
      err.status = 401;
      return next(err);
    }
    next();
  });

const register = mongoose.model('register',registerSchema);
module.exports = register;