const FacultyModels = require('../models/FacultyModel');

const facultyinsert = async(req,res) => {
    try{
        let faculty= await  FacultyModels.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone,
            gender : req.body.gender,
            city : req.body.city,
        })
        if(faculty){
            return res.json({"status" : "1","messege" : "Faculty successfully created"});
        }else{
            return res.json({"status" : "0","messege" : "Faculty not successfully created"});
        }
    }catch(err){
        return res.json({"status" : "0","messege" : err});
    }
}


const facultyview = async(req,res) => {
    try{
        let facultyview = await FacultyModels.find({});
        if(facultyview){
            return res.json({"status" : "1","messege" : facultyview});
        }else{
            return res.json({"status" : "0","messege" : "Record not fetch"});
        }
    }catch(erre){
        return res.json({"status" : "0","messege" : err});
    }
}

const facultydelete = async(req,res) => {
        let id = req.query.id;
        try{
            let facultydelete = await FacultyModels.findOneAndDelete(id);
            if(facultydelete){
                return res.json({"status" : "1","messege" : "Faculty successfully delete"});
            }else{
                return res.json({"status" : "0","messege" : "Faculty not successfully delete"});
            }
        }catch(err){
            return res.json({"status" : "0","messege" : err});
        }
}

const facultyupdate = async(req,res) => {
    let id = req.body.id;
   try{
        let facultyedit = await FacultyModels.findByIdAndUpdate(id,{
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone,
            gender : req.body.gender,
            city : req.body.city,
        })
        if(facultyedit){
            return res.json({"status" : "1","messege" : "Faculty successfully update"});
        }else{
            return res.json({"status" : "0","messege" : "Faculty not successfully update"});
        }
   }catch(err){
    return res.json({"status" : "0","messege" : err});
   }
}

module.exports = {facultyinsert,facultyview,facultydelete,facultyupdate}