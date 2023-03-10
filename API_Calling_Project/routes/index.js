const express = require('express');

const routes = express.Router();

const registercontroller = require("../controllers/RegisterController");
const facultycontroller = require("../controllers/FacultyController");
const coursecontroller = require("../controllers/CourseController");
const studentcontroller = require('../controllers/StudentController');

const passport = require('passport');

routes.post('/registerData',registercontroller.registerData);
routes.post('/studentregisterData',registercontroller.studentregisterData);

// --------faculties
routes.post('/facultyinsert',facultycontroller.facultyinsert);
routes.get('/facultyview',passport.authenticate('jwt',{session : false}),facultycontroller.facultyview);
routes.delete('/facultydelete',passport.authenticate('jwt',{session : false}),facultycontroller.facultydelete);
routes.patch('/facultyupdate',passport.authenticate('jwt',{session : false}),facultycontroller.facultyupdate);
routes.post('/login',registercontroller.login);

// -------course
routes.post('/courseadd',coursecontroller.courseadd);
routes.get('/courseview',passport.authenticate('jwt',{session : false}),coursecontroller.courseview);
routes.delete('/coursedelete',passport.authenticate('jwt',{session : false}),coursecontroller.coursedelete);
routes.patch('/courseupdate',passport.authenticate('jwt',{session : false}),coursecontroller.courseupdate);
routes.get('/facultycourse',passport.authenticate('jwt', {session : false}),coursecontroller.facultycourse)

// ---------------student
routes.post('/studentinsert',studentcontroller.studentinsert);
routes.get('/studentview',passport.authenticate('jwt',{session : false}),studentcontroller.studentview);
routes.delete('/studentdelete',passport.authenticate('jwt',{session : false}),studentcontroller.studentdelete);
routes.patch('/studentupdate',passport.authenticate('jwt',{session : false}),studentcontroller.studentupdate);
routes.get('/studentcourse',passport.authenticate('jwt', {session : false}),studentcontroller.studentcourse);
routes.get('/studentfaculty',passport.authenticate('jwt', {session : false}),studentcontroller.studentfaculty);


module.exports = routes;