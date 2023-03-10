const express = require('express');

const routes = express.Router();

const passport = require('passport');

const logincontroller = require('../controllers/LoginController');

const forgotpass = require('../controllers/ForgotpassController');

const profilecontroller = require('../controllers/ProfileController');

const categorycontroller = require('../controllers/CategoryController');

const subcategorycontroller = require('../controllers/SubcategoryController');

routes.get('/',logincontroller.index);
routes.get('/register',logincontroller.register)
routes.get('/dashboard',passport.chekAuthentication,logincontroller.dashboard);
routes.post('/registerData',logincontroller.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),logincontroller.loginData);
routes.get('/logout',logincontroller.logout);
routes.post('/emaildata',forgotpass.emaildata);
routes.get('/otp',forgotpass.otp);
routes.post('/otpData',forgotpass.otpData);
routes.get('/password',forgotpass.password);
routes.post('/passwordData',forgotpass.passwordData);
routes.get('/profile',passport.chekAuthentication,profilecontroller.index);
routes.post('/profileData',passport.chekAuthentication,profilecontroller.profileData);

//category start 
routes.get('/category',passport.chekAuthentication,categorycontroller.index);
routes.post('/categoryData',categorycontroller.categoryData);
routes.get('/categoryview',passport.chekAuthentication,categorycontroller.categoryview);
//category end


//subcategory start
routes.get('/subcategory',passport.chekAuthentication,subcategorycontroller.index);
routes.post('/subcategoryData',passport.chekAuthentication,subcategorycontroller.subcategoryData);
routes.get('/view_subcategory',passport.chekAuthentication,subcategorycontroller.view_subcategory);


module.exports = routes;