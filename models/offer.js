const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    icon : {
        type : String,
        required : true,
    },
    title: {
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

const offer = mongoose.model('offer',offerSchema);

module.exports = offer;