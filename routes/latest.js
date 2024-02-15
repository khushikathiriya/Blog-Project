const express = require('express')

const routes = express.Router();

const latest = require('../models/latest');

const latestcontroller = require('../controllers/latestcontrollers');
const { route } = require('./slider');

routes.get('/add_latest',latestcontroller.add_latest);

routes.post('/insertlatestdata',latest.uploadlatestImage,latestcontroller.insertlatestdata);

routes.get('/view_latest',latestcontroller.view_latest);

routes.get('/setDeactive/:id',latestcontroller.setDeactive);

routes.get('/SetActive/:id',latestcontroller.SetActive);

routes.get('/deletelatestdata/:id',latestcontroller.deletelatestdata);

routes.get('/updatelatestdata/:id',latestcontroller.updatelatestdata);

routes.post('/editlatestdata',latest.uploadlatestImage,latestcontroller.editlatestdata);

// many delete checkbox
routes.post('/deleteManyRecord',latestcontroller.deleteManyRecord);

// commnet routes - path 

routes.use('/comment',require('./comment'));

module.exports = routes;