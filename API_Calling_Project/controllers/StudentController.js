const StudentModels = require('../models/StudentModel');
const Coursetbl = require('../models/CourseModel')

const studentinsert = async(req,res) => {
    try{
        let student= await  StudentModels.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone,
            gender : req.body.gender,
            city : req.body.city,
            facultyId :req.body.facultyId,
            courseId : req.body.courseId,
        })
        if(student){
            return res.json({"status" : "1","messege" : "Student successfully created"});
        }else{
            return res.json({"status" : "0","messege" : "Student not successfully created"});
        }
    }catch(err){
        return res.json({"status" : "0","messege" : err});
    }
}

const studentcourse = (req,res) => {
    StudentModels.aggregate([
    
            {
                $project : {_id : 0, courseId : 1,name : 1}
            }   
        
        

    ],(err,data)=>{
        if(err){
            return res.json({"status" : "0","messege" : err});
        }
        return res.json({"status" : "1","messege" : data});
    })
}
const studentfaculty = (req,res) => {
    StudentModels.aggregate([
        {
            $project : {_id : 0, facultyId : 1,name:1 }
        }
    ],(err,data)=>{
        if(err){
            return res.json({"status" : "0","messege" : err});

        }
        return res.json({"status" : "1","messege" : data});
    })
}

const studentview = async(req,res) => {
    try{
        let studentview = await StudentModels.find({});
        if(studentview){
            return res.json({"status" : "1","messege" : studentview});
        }else{
            return res.json({"status" : "0","messege" : "Record not fetch"});
        }
    }catch(erre){
        return res.json({"status" : "0","messege" : err});
    }
}

const studentdelete = async(req,res) => {
        let id = req.query.id;
        try{
            let studentdelete = await StudentModels.findOneAndDelete(id);
            if(studentdelete){
                return res.json({"status" : "1","messege" : "Student successfully delete"});
            }else{
                return res.json({"status" : "0","messege" : "Student not successfully delete"});
            }
        }catch(err){
            return res.json({"status" : "0","messege" : err});
        }
}

const studentupdate = async(req,res) => {
    let id = req.body.id;
   try{
        let studentedit = await StudentModels.findByIdAndUpdate(id,{
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone,
            gender : req.body.gender,
            city : req.body.city,
            facultyId : req.body.facultyId,
            courseId : req.body.courseId,

        })
        if(studentedit){
            return res.json({"status" : "1","messege" : "Student successfully update"});
        }else{
            return res.json({"status" : "0","messege" : "Student not successfully update"});
        }
   }catch(err){
    return res.json({"status" : "0","messege" : err});
   }
}

module.exports = {studentinsert,studentview,studentdelete,studentupdate,studentcourse,studentfaculty}