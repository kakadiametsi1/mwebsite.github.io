const SubcategoryModel = require('../models/SubcategoryModel');
const CategoryModel = require('../models/CategoryModel');
const index = async(req,res) => {
    try{
        let category = await CategoryModel.find({});
        if(category)
        {
            return res.render('add_subcategory',{
                categorydata : category
            })
        }else{
            console.log("Record not fetch");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
    return res.render('add_subcategory');
}

const subcategoryData = async(req,res) => {
    try{
        const addsubcategory = await SubcategoryModel.create({
            categoryId : req.body.categoryId,
            subcategory : req.body.subcategory
        })
        if(addsubcategory){
            console.log("Subcategory successfully add");
            return res.redirect('back');
        }else{
            console.log("Subcategory not successfully add");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const view_subcategory = (req,res) => {

    SubcategoryModel.find({}).populate("categoryId") // key to populate
        .then(user => {
           console.log(user);
           return res.render('view_sub_categorey',{
                allrecord : user
           });
   });

   
}


module.exports = {index,subcategoryData,view_subcategory};