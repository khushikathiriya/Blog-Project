const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name : {
        type : String,
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

const review = mongoose.model('review',reviewSchema);

module.exports = review;