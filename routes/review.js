const express = require('express');

const routes = express.Router();

const reviewcontroller = require('../controllers/reviewcontrollers');
const { route } = require('./slider');
const review = require('../models/review');

routes.get('/add_review',reviewcontroller.add_review);

routes.post('/insertreviewdata',reviewcontroller.insertreviewdata);

routes.get('/view_review',reviewcontroller.view_review);

routes.get('/setDeactive/:id',reviewcontroller.setDeactive);

routes.get('/SetActive/:id',reviewcontroller.SetActive);

routes.get('/deletereviewdata/:id',reviewcontroller.deletereviewdata);

routes.get('/updatereviewdata/:id',reviewcontroller.updatereviewdata);

routes.post('/editreviewdata',reviewcontroller.editreviewdata);

// delete many checkbox - item

routes.post('/deleteManyRecord',reviewcontroller.deleteManyRecord)

module.exports = routes;