const express = require('express');

const routes = express.Router();

const categorycontroller = require('../controllers/categorycontrollers');

routes.get('/add_category',categorycontroller.add_category);

routes.post('/insertcategorydata',categorycontroller.insertcategorydata);

routes.get('/view_category',categorycontroller.view_category);

routes.get('/setDeactive/:id',categorycontroller.setDeactive);

routes.get('/SetActive/:id',categorycontroller.SetActive);

routes.get('/deletecategorydata/:id',categorycontroller.deletecategorydata);

routes.get('/updatecategorydata/:id',categorycontroller.updatecategorydata);

routes.post('/editcategorydata',categorycontroller.editcategorydata);

// delete many checkbox - item
routes.post('/deleteManyRecord',categorycontroller.deleteManyRecord);

module.exports = routes;
