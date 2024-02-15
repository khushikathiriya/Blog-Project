const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category : {
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

const category = mongoose.model('category',categorySchema);

module.exports = category;