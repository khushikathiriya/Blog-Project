const express = require('express')

const routes = express.Router();

const subcategory = require('../models/subcategory');

const subcategorycontroller = require('../controllers/subcategorycontrollers');
const { route } = require('./category');

routes.get('/add_subcategory',subcategorycontroller.add_subcategory);

routes.post('/insertsubcategorydata',subcategory.uploadsubcategoryImage,subcategorycontroller.insertsubcategorydata);

routes.get('/view_subcategory',subcategorycontroller.view_subcategory);

routes.get('/setDeactive/:id',subcategorycontroller.setDeactive);

routes.get('/SetActive/:id',subcategorycontroller.SetActive);

routes.get('/deletecategorydata/:id',subcategorycontroller.deletecategorydata);

routes.get('/updatecategorydata/:id',subcategorycontroller.updatecategorydata);

routes.post('/editsubcategorydata',subcategory.uploadsubcategoryImage,subcategorycontroller.editsubcategorydata);

// delete many checkbox- item
routes.post('/deleteManyRecord',subcategorycontroller.deleteManyRecord)


module.exports = routes;