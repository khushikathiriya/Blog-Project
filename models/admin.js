const mongoose = require('mongoose');

const adminImagePath = '/uploads/admin';

const path = require('path');

const multer = require('multer');

const passport = require('passport')

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : Number,
        require : true,
    },
    gender : {
        type : String,
        required : true,
    },
    hobby : {
        type : Array,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    adminImages :{
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


const adminstorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',adminImagePath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})
adminSchema.statics.uploadedAdminImage = multer({storage : adminstorage}).single('adminImages');
adminSchema.statics.imageAdminPath = adminImagePath



const admin = mongoose.model('admin',adminSchema);

module.exports = admin;