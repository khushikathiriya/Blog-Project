const mongoose = require('mongoose');

const subcategoryImagePath = '/uploads/sub_category';

const path = require('path');

const multer = require('multer');

const passport = require('passport')

const subcategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref :'category',
        require: true,
    },
    description: {
        type: String,
        required: true,
    },
    subcategory_image: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    created_date: {
        type: String,
        required: true,
    },
    upadata_date: {
        type: String,
        required: true,
    },
})


const subcategorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', subcategoryImagePath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
subcategorySchema.statics.uploadsubcategoryImage = multer({ storage: subcategorystorage }).single('subcategory_image');
subcategorySchema.statics.imagesubcategoryPath = subcategoryImagePath


const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;