const express = require('express')

const routes = express.Router();

const comment = require('../models/comment');

const usercontroller = require('../controllers/usercontrollers');

const passport = require('passport');

routes.get('/',usercontroller.home);

// latest post in more description
routes.get('/blogsinglepage/:id',usercontroller.blogsinglepage);

// commment 
routes.post('/addcomment',comment.uploadcommentImage,usercontroller.addcomment);

// work - three colunms routeing
routes.get('/third_colums',usercontroller.third_colums);

// work - four colunms routeing
routes.get('/four_colums',usercontroller.four_colums);

// contact routeing
routes.get('/contact',usercontroller.contact);

routes.post('/insertcontactdata',usercontroller.insertcontactdata);

module.exports = routes;