const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
    },
    subject : {
        type : String,
        required : true,
    },
    message :{
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
   

})

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;