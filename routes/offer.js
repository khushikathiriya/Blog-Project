const express = require('express');

const routes = express.Router();

const offercontroller = require('../controllers/offercontrollers');

routes.get('/add_offer',offercontroller.add_offer);

routes.post('/insertOfferdata',offercontroller.insertOfferdata);

routes.get('/view_offer',offercontroller.view_offer);

routes.get('/setDeactive/:id',offercontroller.setDeactive);

routes.get('/SetActive/:id',offercontroller.SetActive);

routes.get('/deleteofferdata/:id',offercontroller.deleteofferdata);

routes.get('/updateofferdata/:id',offercontroller.updateofferdata);

routes.post('/editofferdata',offercontroller.editofferdata);

// many delete checkbox routeung
routes.post('/deleteManyRecord',offercontroller.deleteManyRecord)

module.exports = routes;