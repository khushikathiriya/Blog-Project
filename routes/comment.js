const express = require('express')

const routes = express.Router();

const commentcontroller = require('../controllers/commnetcontrollers');

routes.get('/view_comment',commentcontroller.view_comment);

routes.get('/setDeactive/:id',commentcontroller.setDeactive);

routes.get('/SetActive/:id',commentcontroller.SetActive);

routes.get('/deletecommentdata/:id',commentcontroller.deletecommentdata);

// many delete checkbox - item
routes.post('/deleteManyRecord',commentcontroller.deleteManyRecord);

module.exports = routes;