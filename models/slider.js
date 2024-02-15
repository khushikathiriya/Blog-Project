const mongoose = require('mongoose');

const sliderImagePath = '/uploads/slider';

const path = require('path');

const multer = require('multer');

const passport = require('passport')

const sliderSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    link : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    sliderImages :{
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


const sliderstorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',sliderImagePath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})
sliderSchema.statics.uploadsliderImage = multer({storage : sliderstorage}).single('sliderImages');
sliderSchema.statics.imagesliderPath = sliderImagePath


const slider = mongoose.model('slider', sliderSchema);

module.exports = slider;