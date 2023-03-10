const RegisterModel = require('../models/RegisterModel');

const nodemailer = require('nodemailer');

const cookie = require('cookie-parser');

const emaildata = async (req,res) => {
        let email = req.body.useremail;
       
        let user = await  RegisterModel.findOne({email : email});


        if(user){
            let otp = Math.floor(Math.random() * 100000);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rwn3developer11@gmail.com',
                    pass: 'iumtxrvzfcndjqlu'
                }
            });


            var mailOptions = {
                from: 'rwn3developer11@gmail.com',
                to: email,
                subject: 'Forgot password',
                text: 'Otp :- '+otp
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  return false;
                } else {
                    console.log('Email sent: ' + info.response);

                    const otpdata = {
                        useremail : user.email,
                        userotp : otp
                    }

                    res.cookie('otp',otpdata);
                    return res.redirect('/otp');

                }
              });

        }else{
            console.log("User not found");
            return res.redirect('back');
        }

}   

const otp = (req,res) => {
    return res.render('otp');
}

const otpData = (req,res) => {
    if(req.cookies.otp.userotp == req.body.otp){
        return res.redirect('password');
    }else{
        console.log("Otp is wrong");
        return res.redirect('back');
    }
}

const password = (req,res) => {
    return res.render('password');
}

const passwordData = async (req,res) => {
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    try{
        if(password == cpassword){
            let email = req.cookies.otp.useremail;
            let user = await RegisterModel.findOne({email : email});
           if(!user){
                console.log("User not found");
                return false
           }

          let id = user.id;
          let editrecord = await RegisterModel.findByIdAndUpdate(id,{
                password : password,
          })

          if(editrecord){
                console.log("Password successfully changed!");
                res.clearCookie('otp');
                return res.redirect('/');
          }else{
            console.log("Password not change");
            return false;
          }


        }else{
            console.log("Password and Confirm password not match");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
        

}

module.exports = {emaildata,otp,otpData,password,passwordData};