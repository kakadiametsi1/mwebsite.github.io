const categoryModel = require('../models/CategoryModel');

const index = (req,res) => {
    return res.render('category');
}

const categoryData = async (req,res) => {
    try{
        let category = await categoryModel.create({
            category : req.body.category
        })
        if(category){
            console.log("Category successfully add");
            return res.redirect('back');
        }else{
            console.log("Category not add");
            return false;
        }
    }catch(err){
        console.log(err);
        return false; 
    }
}

const categoryview = async(req,res) => {
    try{
        let categoryrecord = await  categoryModel.find({});
        if(categoryrecord)
        {
            return res.render('view_category',{
                allcatdata : categoryrecord
            })
        }else{
            console.log("Category Record not fetch");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
    return res.render('view_category');
}

module.exports = {index,categoryData,categoryview};