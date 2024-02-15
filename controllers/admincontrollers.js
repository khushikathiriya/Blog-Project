
const adminmodel = require('../models/admin');

const nodemailer = require("nodemailer");

const fs = require('fs');

// -----dash board-----
module.exports.dashbord = async (req, res) => {
  try{
    return res.render('dashbord');
  }
  catch(err)
  {
    console.log(err);
  }

}
//   admin data page
module.exports.admindata = async (req, res) => {
    try{

        return res.render('form')
    }
    catch(err)
    {
        console.log(err);
    }

}

//        view page
module.exports.viewdata = async (req, res) => {
    try {
        // searching logic 
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        // pagination logic
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }
        var perPage = 2;
        let admindata = await adminmodel.find({
            $or: [
                { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'email': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        })
            .limit(perPage)
            .skip(perPage * page);

        let totalAdminData = await adminmodel.find({
            $or: [
                { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'email': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();
        // console.log(totalAdminData);
        if (admindata) {
            return res.render('tabel', {
                admindata: admindata,
                search: search,
                totalDocument: Math.ceil(totalAdminData / perPage),
                currentPage: page
            });
        }
        else {
            console.log('Record Not Found')
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

//       data insert 
module.exports.insertadmindata = async (req, res) => {

    try {

        var imagesPath = '';
        req.body.name = req.body.fname + ' ' + req.body.lname;
        if (req.file) {
            imagesPath = adminmodel.imageAdminPath + '/' + req.file.filename;
        }
        req.body.adminImages = imagesPath;
        req.body.isActive = true
        req.body.created_date = new Date().toLocaleString();
        req.body.upadata_date = new Date().toLocaleString();
        let adminData = await adminmodel.create(req.body);
        if (adminData) {
            console.log('Record Insert Sussfully');
            return res.redirect('/admin/viewdata');
        }
        else {
            console.log('Something Wrong')
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')

    }
}

//  deactive
module.exports.setDeactive = async (req, res) => {
    // console.log(req.params.id);
    try {
        if (req.params.id) {
            let activeData = await adminmodel.findByIdAndUpdate(req.params.id, ({ isActive: false }));
            if (activeData) {
                console.log('Data Deactive Sussfully')
                return res.redirect('back')
            }
            else {
                console.log('Data Not Deactive')
                return res.redirect('back')
            }
        }
        else {
            console.log('Params is Not connent')
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}
// active 
module.exports.SetActive = async (req, res) => {
    try {
        if (req.params.id) {
            let activeData = await adminmodel.findByIdAndUpdate(req.params.id, ({ isActive: true }));
            if (activeData) {
                console.log('Data Active Sussfully')
                return res.redirect('back')
            }
            else {
                console.log('Data Not Active')
                return res.redirect('back')
            }
        }
        else {
            console.log('Params is Not connent')
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}

// delate data
module.exports.deleteadmindata = async (req, res) => {
    // await adminmodel.findByIdAndDelete(req.params.id);
    // return res.redirect('back')
    try {
        if (req.params.id) {
            let deletedata = await adminmodel.findByIdAndDelete(req.params.id, ({}));
            if (deletedata) {
                console.log('Data sussecsfully Delete')
                return res.redirect('back')
            }
        }
        else {
            console.log('Data is not delete')
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}

// update data

module.exports.updateadmindata = async (req, res) => {
    try {
        if (req.params.id) {
            let record = await adminmodel.findById(req.params.id, ({}));
            if (record) {
                // if (req.cookies.admin == undefined) {
                //     return res.redirect('/admin/')
                // }
                // var profile = req.cookies.admin;
                return res.render('update_form', {
                    addata: record,
                    // profile: profile,
                    name: record.name.split(' '),
                })
            }
            else {
                console.log('Record Not Updata');
                return res.redirect('back')
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}

// edit data

module.exports.editadmindata = async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    try {
        let oldData = await adminmodel.findById(req.body.Editid);
        if (oldData) {
            if (req.file) {
                var fullpath = path.join(__dirname, "..", oldData.adminImages);
                await fs.unlinkSync(fullpath);

                req.body.name = req.boy.fname + ' ' + req.body.lname;
                req.body.upadata_date = new Date().toLocaleString();
                imagesPath = adminmodel.imageAdminPath + '/' + req.file.filename;
                var update = await adminmodel.findByIdAndUpdate(req.body.Editid, req.body);
                if (update) {
                    if (req.cookies.khushi._id == req.body.Editid) {
                        var adminData = await adminmodel.findById(req.body.Editid);
                        // console.log("cookie")
                        res.cookie('admin', adminData)
                        return res.redirect('/admin/viewdata')
                    }
                    else {
                        console.log("not cookie")
                        console.log('update data suscces')
                        return res.redirect('/admin/viewdata')
                    }
                } else {
                    console.log('update unsuscces')
                    return res.redirect('back')
                }


            }
            else {
                req.body.name = req.body.fname + ' ' + req.body.lname;
                req.body.adminImages = oldData.adminImages;
                req.body.upadata_date = new Date().toLocaleString();

                var update = await adminmodel.findByIdAndUpdate(req.body.Editid, req.body)
                if (update) {
                    if (req.cookies.khushi._id == req.body.Editid) {
                        var adminData = await adminmodel.findById(req.body.Editid);
                        console.log("cookie")
                        res.cookie('admin', adminData)
                        return res.redirect('/admin/viewdata')
                    }
                    else {
                        console.log("not cookie")
                        console.log('update data suscces')
                        return res.redirect('/admin/viewdata')
                    }
                }
                else {
                    console.log('update unsuscces')
                    return res.redirect('back')
                }
            }
        }

        else {
            console.log("data not found");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }

}


// login
module.exports.Checklogin = async (req, res) => {
    return res.redirect('/admin/dashbord')
}

// logout

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('admin')
        if (req.cookies.admin) {
            return res.redirect('/admin/dashbord');
        }
        else {
            return res.redirect('/admin/')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}

// change password

module.exports.Changepassword = async (req, res) => {
    try {
        if (req.cookies.admin == undefined) {
            return res.redirect('/admin/')
        }
        var profile = req.cookies.admin;
        return res.render('change_password', {
            profile: profile
        });
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}

// modify password logic

module.exports.modifyPassword = async (req, res) => {
    // console.log(req.body)
    try {
        var profile = req.cookies.admin;
        if (profile.password == req.body.password) {
            if (req.body.password != req.body.npassword) {
                if (req.body.npassword == req.body.cpassword) {
                    let Alladmin = await adminmodel.findById(profile._id);
                    if (Alladmin) {
                        let EditPass = await adminmodel.findByIdAndUpdate(Alladmin.id, { 'password': req.body.npassword })
                        if (EditPass) {
                            return res.redirect('/admin/logout')
                        }
                        else {
                            console.log('Password Not Password')
                        }
                    }
                    else {
                        console.log('Record Not Found')
                    }
                }
                else {
                    console.log('confrim Password is Not Same')
                }
            }
            else {
                console.log('current And New Password Are Same')
            }

        }
        else {
            console.log('current password not same')
        }
        return res.redirect('back')
    }

    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// profile page

module.exports.Profile = async (req, res) => {
    try {
        let admindata = await adminmodel.find({});
        if (admindata) {
            // if(req.cookies.admin == undefined)
            // {
            //     return res.redirect('/admin/')
            // }
            // var profile = req.cookies.admin;
            return res.render('profile')
            // ,{
            //     name: admindata.name.split(' '),
            // })
            // ,{
            //     profile : profile
            // });
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }

}

// forgot password

module.exports.CheckEmail = async (req, res) => {
    // console.log(req.body)
    try {

        let CheckEmailData = await adminmodel.findOne({ email: req.body.email })
        if (CheckEmailData) {

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

            var OTP = Math.round(Math.random() * 10000);

            const info = await transporter.sendMail({
                from: 'khushikathiriyak@gmail.com', // sender address
                to: CheckEmailData.email, // list of receivers
                subject: "Hello ", // Subject line
                text: "here is your otp", // plain text body
                // html : `<a href='http://localhost:8001/admin/resetpass'>Click Here</a>`
                html: `<b>OTP : ${OTP}</b>,` // html body
            });

            if (info) {
                res.cookie('otp', OTP);
                res.cookie('email', CheckEmailData.email)

                return res.redirect('/admin/otppage')
            }
            else {
                return res.redirect('back')
            }

            //   console.log('sent email');
            //   return res.redirect('Checkotp');


        }
        else {
            console.log('email is not sent');
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.checkOTP = async (req, res) => {
    // console.log(req.body)
    // console.log(req.cookies.otp)
    if (req.body.otp == req.cookies.otp) {
        // return res.redirect('/admin/resetpass');
        return res.render('forget_password/resetPage')

    }
    else {
        console.log('OTP not match')
        return res.redirect('back')
    }
}

module.exports.resetpass = async (req, res) => {
    try {
        if (req.body.npass == req.body.cpass) {
            var email = req.cookies.email
            if (email) {
                var adminData = await adminmodel.findOne({ email: email })
                if (adminData) {
                    var updatepass = await adminmodel.findByIdAndUpdate(adminData.id, { password: req.body.npass })
                    if (updatepass) {
                        res.clearCookie('otp')
                        res.clearCookie('email')
                        return res.redirect('/admin/')
                    } else {
                        console.log('password not change');
                        return res.redirect('back')
                    }
                }
                else {
                    console.log('data not found');
                    return res.redirect('back')
                }
            }
            else {
                console.log('cookie not found');
                return res.redirect('back')
            }
        }
        else {
            console.log('both password is not match');
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// multipal delete with checkbox
module.exports.deleteManyRecord = async (req, res) => {
    // console.log(req.body);
    try {
        if (req.body.deleteallcheck) {
            await adminmodel.deleteMany({ _id: { $in: req.body.deleteallcheck } })
            return res.redirect('back');
        }
        else {
            console.log('Record Are Not Delete');
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}



