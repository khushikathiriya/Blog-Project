const mongoose = require('mongoose');

const commentImagePath = '/uploads/comment';

const path = require('path');

const multer = require('multer');

const commentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'latest',
        require : true,
    },
    message : {
        type : String,
        required : true,
    },
    user_Image :{
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


const commentstorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',commentImagePath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})
commentSchema.statics.uploadcommentImage = multer({storage : commentstorage}).single('user_Image');
commentSchema.statics.imagecommentPath = commentImagePath


const comment = mongoose.model('comment', commentSchema);

module.exports = comment;