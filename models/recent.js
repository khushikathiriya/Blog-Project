const mongoose = require('mongoose');

const recentImagePath = '/uploads/recentphoto';

const path = require('path');

const multer = require('multer');

const passport = require('passport')

const recentSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    recentImages :{
        type : String,
        required : true,
    },
    isActive : {
        type : Boolean,
        required : true,
    },
    created_date :{
        type : String,
        required : true,
    }, 
    upadata_date :{
        type : String,
        required : true,
    },
})


const recentstorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',recentImagePath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})
recentSchema.statics.uploadrecentImage = multer({storage : recentstorage}).single('recentImages');
recentSchema.statics.imagerecentPath = recentImagePath


const recent = mongoose.model('recent', recentSchema);

module.exports = recent;