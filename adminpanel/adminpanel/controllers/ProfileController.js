
const RegisterModel = require('../models/RegisterModel');

const index = (req,res) => {
    
    return res.render('profile');
}

const profileData = async(req,res) => {
    let id = res.locals.userLogin.id;
    try{
        let userprofile = await RegisterModel.findByIdAndUpdate(id,{
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            city : req.body.city
        });

        if(userprofile){
            console.log("Profile successfully changed");
            return res.redirect('/dashboard');
        }else{
            console.log("Profile not update");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
    
}

module.exports = {index,profileData};