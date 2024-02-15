const express = require('express')

const routes = express.Router();

const adminconterollers = require('../controllers/admincontrollers');

const adminmodel = require('../models/admin');

const passport = require('passport')

routes.get('/',async(req,res)=>{
    return res.render('login')
})

routes.get('/dashbord',passport.checkAuthenticatedUser,adminconterollers.dashbord)

routes.get('/admindata',passport.checkAuthenticatedUser,adminconterollers.admindata);

routes.post('/insertadmindata',adminmodel.uploadedAdminImage,adminconterollers.insertadmindata);

routes.get ('/viewdata',passport.checkAuthenticatedUser,adminconterollers.viewdata);

routes.get('/setDeactive/:id',adminconterollers.setDeactive);

routes.get('/SetActive/:id',adminconterollers.SetActive);

routes.get('/deleteadmindata/:id',adminconterollers.deleteadmindata);

routes.get('/updateadmindata/:id',passport.checkAuthenticatedUser,adminconterollers.updateadmindata);

routes.post('/editadmindata',adminmodel.uploadedAdminImage,adminconterollers.editadmindata);

routes.post('/Checklogin',passport.authenticate('local',{failureRedirect : '/admin/'}),adminconterollers.Checklogin);

routes.get('/logout',adminconterollers.logout);

routes.get('/Changepassword',adminconterollers.Changepassword);

routes.post('/modifyPassword',adminconterollers.modifyPassword);

routes.get('/Profile',passport.checkAuthenticatedUser,adminconterollers.Profile)

// forgot password 

routes.get('/mailpage',async (req,res)=>{
    return res.render('forget_password/emailPage');
})

routes.post('/CheckEmail',adminconterollers.CheckEmail);

routes.get('/otppage', async (req,res)=>{
    return res.render('forget_password/OtpPage')
});

routes.post('/resetpass', adminconterollers.resetpass );

routes.post('/checkOTP',adminconterollers.checkOTP);

// multipal delete with checkbox
routes.post('/deleteManyRecord',adminconterollers.deleteManyRecord)


// slider path - routes 
routes.use('/slider',passport.checkAuthenticatedUser,require('./slider'));

// offer path - routes
routes.use('/offer',passport.checkAuthenticatedUser,require('./offer'));

// recent photo path - routes
routes.use('/recent',passport.checkAuthenticatedUser,require('./recent'));

// other path - routes
routes.use('/review',passport.checkAuthenticatedUser,require('./review'));

// Latest path - routes
routes.use('/latest',passport.checkAuthenticatedUser,require('./latest'));

// work - category path - routes
routes.use('/category',passport.checkAuthenticatedUser,require('./category'));

// work - subcategory path - routes
routes.use('/subcategory',passport.checkAuthenticatedUser,require('./subcategory'));

// contact path - routes
routes.use('/contact',passport.checkAuthenticatedUser,require('./contact'));



module.exports = routes;
