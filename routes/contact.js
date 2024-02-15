const express = require('express');

const routes = express.Router();

const contactcontroller = require('../controllers/contactcontrollers');

routes.get('/view_contact',contactcontroller.view_contact);

routes.get('/setDeactive/:id',contactcontroller.setDeactive);

routes.get('/SetActive/:id',contactcontroller.SetActive);

routes.get('/deletecontactdata/:id',contactcontroller.deletecontactdata);



module.exports = routes;