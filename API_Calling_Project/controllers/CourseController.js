const Coursetbl = require('../models/CourseModel');
const FacultyModels = require('../models/FacultyModel');


const courseadd = async(req,res) => {
    try{
        let course= await  Coursetbl.create({
            name : req.body.name,
            fees : req.body.fees,
            duration : req.body.duration,
            facultyId : req.body.facultyId,
        })
        if(course){
            return res.json({"status" : "1","messege" : "Course successfully added"});
        }else{
            return res.json({"status" : "0","messege" : "Course successfully not added"});
        }
    }catch(err){
        return res.json({"status" : "0","messege" : err});
    }
}

const facultycourse = (req,res) => {
    Coursetbl.aggregate([
        {
            $lookup : {
                from : "courses",
                localField : "_id",
                foreignField : "facultyId",
                as : "Faculty_course" 
            },     
        },
        // {
        //     $match : {
        //         "courses._id" : "courses.facultyId"
        //     }
        // }

    ],(err,data)=>{
        if(err){
            return res.json({"status" : "0","messege" : err});
        }
        return res.json({"status" : "1","messege" : data});
    })
}

const courseview = async(req,res) => {
    try{
        let courseview = await Coursetbl.find({});
        if(courseview){
            return res.json({"status" : "1","messege" : courseview});
        }else{
            return res.json({"status" : "0","messege" : "Record not fetch"});
        }
    }catch(erre){
        return res.json({"status" : "0","messege" : err});
    }
}

const coursedelete = async(req,res) => {
        let id = req.query.id;
        try{
            let coursedelete = await Coursetbl.findOneAndDelete(id);
            if(coursedelete){
                return res.json({"status" : "1","messege" : "Course successfully  delete"});
            }else{
                return res.json({"status" : "0","messege" : "Course successfully not delete"});
            }
        }catch(err){
            return res.json({"status" : "0","messege" : err});
        }
}

const courseupdate = async(req,res) => {
    let id = req.body.id;
   try{
        let courseedit = await Coursetbl.findByIdAndUpdate(id,{
            name : req.body.name,
            fees : req.body.fees,
            duration : req.body.duration,
            facultyId : req.body.facultyId,
        })
        if(courseedit){
            return res.json({"status" : "1","messege" : "Course successfully edited"});
        }else{
            return res.json({"status" : "0","messege" : "Course successfully not edited"});
        }
   }catch(err){
    return res.json({"status" : "0","messege" : err});
   }
}

module.exports = {courseadd,courseview,coursedelete,courseupdate,facultycourse}