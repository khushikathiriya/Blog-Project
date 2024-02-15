const mongoose = require('mongoose');

const latestImagePath = '/uploads/latest';

const path = require('path');

const multer = require('multer');

const passport = require('passport')

const latestSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    categorized: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required: true,
    },
    latestImages: {
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


const lateststorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', latestImagePath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
latestSchema.statics.uploadlatestImage = multer({ storage: lateststorage }).single('latestImages');
latestSchema.statics.imagelatestPath = latestImagePath


const latest = mongoose.model('latest', latestSchema);


module.exports = latest;