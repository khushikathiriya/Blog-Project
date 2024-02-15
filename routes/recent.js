const express = require('express')

const routes = express.Router();

const recent = require('../models/recent')

const recentcontroller = require('../controllers/recentcontrollers');

routes.get('/add_recent',recentcontroller.add_recent);

routes.post('/insertrecentdata',recent.uploadrecentImage,recentcontroller.insertrecentdata);

routes.get('/view_recent',recentcontroller.view_recent);

routes.get('/setDeactive/:id',recentcontroller.setDeactive);

routes.get('/SetActive/:id',recentcontroller.SetActive);

routes.get('/deleterecentdata/:id',recentcontroller.deleterecentdata);

routes.get('/updaterecentdata/:id',recentcontroller.updaterecentdata);

routes.post('/editrecentdata',recent.uploadrecentImage,recentcontroller.editrecentdata);

// many delete checkbox
routes.post('/deleteManyRecord',recentcontroller.deleteManyRecord);

module.exports = routes;