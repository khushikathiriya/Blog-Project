const slider = require("../models/slider");

const offer = require('../models/offer');

const recent = require("../models/recent");

const review = require('../models/review');

const latest = require('../models/latest');

const comment = require('../models/comment');

const category = require('../models/category');

const subcategory = require('../models/subcategory');

const contact = require("../models/contact")

const nodemailer = require("nodemailer")

module.exports.home = async (req, res) => {
    // console.log('home');
    try {
        let sliderData = await slider.find({});
        let offerData = await offer.find({});
        let recentData = await recent.find({});
        let reviewData = await review.find({});
        let latestData = await latest.find({});
        if (sliderData || offerData || recentData || reviewData || latestData) {
            return res.render('user_pannel/home', {
                sliderData: sliderData,
                offerData: offerData,
                recentData: recentData,
                reviewData: reviewData,
                latestData: latestData
            });
        }
        else {
            console.log('slider data found')
            return res.redirect('back')
        };

    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// latest post in more description
module.exports.blogsinglepage = async (req, res) => {

    // next previous logic start
    let AllPostData = await latest.find({});
    let Ids = [];

    AllPostData.map((v, i) => {
        Ids.push(v.id)
    })

    let next;
    for (var i = 0; i < Ids.length; i++) {
        if (Ids[i] === req.params.id) {
            next = i;
            break;
        }
    }
    // next previous logic end

    // recent photo logic start
    let recentpost = await latest.find({}).sort({ '_id': -1 }).limit(3);
    // recent photo logic end


    let postData = await latest.findById(req.params.id);
    let commentdata = await comment.find({ postId: req.params.id, isActive: true });
    return res.render('user_pannel/blog_single', {
        postDetalis: postData,
        commentdata: commentdata,
        // prev next var pass
        AllIds: Ids,
        currentPostion: next,

        // recent photo
        recentpost: recentpost
    })
    // console.log(postData)
}

// add comment data
module.exports.addcomment = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    try {
        let imgPath = ''
        if (req.file) {
            imgPath = comment.imagecommentPath + '/' + req.file.filename;
        }
        req.body.user_Image = imgPath;
        req.body.isActive = false;
        req.body.created_date = new Date().toLocaleString();
        req.body.upadata_date = new Date().toLocaleString();

        let commentdata = await comment.create(req.body)
        if (commentdata) {
            console.log('Record Insert Sussfully');
            return res.redirect('back');
        }
        else {
            console.log('Something Wrong')
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// three columns data
module.exports.third_colums = async (req, res) => {
    try {
        let categoryData = await category.find({});
        let subcateData = await subcategory.find({}).populate('category_id').exec();
        // console.log(subcateData);
        // console.log(categoryData);
        if (categoryData || subcateData) {
            return res.render('user_pannel/work/third_colums', {
                categoryData: categoryData,
                subcateData: subcateData
            });

        }

    }
    catch (err) {
        console.log(err);
        return res.render('back');
    }
}

// four columns data
module.exports.four_colums = async (req, res) => {
    try {
        let categoryData = await category.find({});
        let subcateData = await subcategory.find({}).populate('category_id').exec();
        // console.log(subcateData);
        // console.log(categoryData);
        if (categoryData || subcateData) {
            return res.render('user_pannel/work/four_colums', {
                categoryData: categoryData,
                subcateData: subcateData
            });

        }

    }
    catch (err) {
        console.log(err);
        return res.render('back');
    }
}

// contact page show
module.exports.contact = async (req, res) => {
    return res.render('user_pannel/contact/contact')
}

// contact insert data
module.exports.insertcontactdata = async (req, res) => {
    try {
        console.log(req.body)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "khushikathiriyak@gmail.com",
                pass: "hvmyjereepllooux",
            },
        });


        const info = await transporter.sendMail({
            from: 'khushikathiriyak@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ", // Subject line
            attachments: [{
                filename: 'avatar-02.jpg',
                path: 'asstes/images/icon/avatar-02.jpg',
                cid: 'photo'
            }],
            html: `<div style='width:100px; height:100px'>
                <img src='cid:photo' width='100' height='100'/>
            </div>` // html body
        });

        if (info) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString()
            await contact.create(req.body)
            return res.redirect('back')
        }
        else {
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}