const express = require('express');

const routes = express.Router();

const slider = require('../models/slider')

const slidercontroller = require('../controllers/slidercontrollers');

routes.get('/add_slider',slidercontroller.add_slider);

routes.post('/insertsliderdata',slider.uploadsliderImage,slidercontroller.insertsliderdata);

routes.get('/view_slider',slidercontroller.view_slider);

routes.get('/setDeactive/:id',slidercontroller.setDeactive);

routes.get('/SetActive/:id',slidercontroller.SetActive);

routes.get('/deletesliderdata/:id',slidercontroller.deletesliderdata);

routes.get('/updatesliderdata/:id',slidercontroller.updatesliderdata);

routes.post('/editsliderdata',slider.uploadsliderImage,slidercontroller.editsliderdata);

// multipal delete with checkbox
routes.post('/deleteManyRecord',slidercontroller.deleteManyRecord)

module.exports = routes;

