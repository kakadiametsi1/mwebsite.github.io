const RegisterModel = require('../models/RegisterModel');

const index = (req,res) => {
    res.clearCookie('otp');
    if(res.locals.userLogin){
        return res.redirect('dashboard');
    }
    return res.render('index');
}

const dashboard = (req,res) => {
    return res.render('dashboard');
}

const register = (req,res) => {
    return res.render('register');
}

const registerData = async (req,res) => {
   try{
        let password = req.body.password;
        let cpassword = req.body.cpassword;
        if(password == cpassword){
            let register = RegisterModel.create({
                name : req.body.name,
                email : req.body.email,
                password : password,
            });
            if(register){
                console.log("User successfully register");
                return res.redirect('/');
            }else{
                console.log("User not register");
                return res.redirect('back');
            }
        }else{
            console.log("Password and Confirm password not metch");
            return false;
        }       
   }catch(err){
        console.log(err);
        return false;
   }
}

const loginData = (req,res) => {
    return res.redirect('/dashboard');
}

const logout = (req,res) => {
    req.logout((err)=>{
        if(err){
            console.log("User not logout");
            return false;
        }
        return res.redirect('/');
    })
}


module.exports = {index,dashboard,register,registerData,loginData,logout};