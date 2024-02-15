const recent = require('../models/recent');

const fs = require('fs');

const path = require('path');

// show recent page
module.exports.add_recent = async (req, res) => {
    return res.render('recent_photo/add_recent')
}

// Insert Recent Data
module.exports.insertrecentdata = async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    try {
        let imgPath = ' ';
        if (req.file) {
            imgPath = recent.imagerecentPath + '/' + req.file.filename;
        }
        req.body.recentImages = imgPath;
        req.body.isActive = true
        req.body.created_date = new Date().toLocaleString();
        req.body.upadata_date = new Date().toLocaleString();
        let recentData = await recent.create(req.body);
        if (recentData) {
            console.log('Record Insert Sussfully');
            return res.redirect('/admin/dashbord');
        }
        else {
            console.log('Something Wrong')
            return res.redirect('back')
        }


    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// view recent data
module.exports.view_recent = async (req, res) => {
    try {
        // seraching logic
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        // pagenation logic
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }
        var perPage = 2;

        let recentdata = await recent.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*' } },
                { 'link': { $regex: '.*' + search + '.*' } },
            ]
        })
            .limit(perPage)
            .skip(perPage * page);

        let totalrecentData = await recent.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'link': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();

        if (recentdata) {
            return res.render('recent_photo/view_recent', {
                recentdata: recentdata,
                search: search,
                totalDocument: Math.ceil(totalrecentData / perPage),
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

//  deactive
module.exports.setDeactive = async (req, res) => {
    // console.log(req.params.id);
    try {
        if (req.params.id) {
            let activeData = await recent.findByIdAndUpdate(req.params.id, ({ isActive: false }));
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
            let activeData = await recent.findByIdAndUpdate(req.params.id, ({ isActive: true }));
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

// delete recent data
module.exports.deleterecentdata = async (req, res) => {
    try {
        if (req.params.id) {
            let deletedata = await recent.findByIdAndDelete(req.params.id, ({}));
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

// update recent data
module.exports.updaterecentdata = async (req, res) => {
    try {
        if (req.params.id) {
            let record = await recent.findById(req.params.id);
            if (record) {
                return res.render('recent_photo/update_recent', {
                    recentData: record,
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

// edit recent data
module.exports.editrecentdata = async (req, res) => {
    try {
        let oldData = await recent.findById(req.body.Editid);
        if (oldData) {
            if (req.file) {
                var fullpath = path.join(__dirname, "..", oldData.recentImages);
                await fs.unlinkSync(fullpath);

                req.body.upadata_date = new Date().toLocaleString();
                req.body.recentImages = recent.imagerecentPath + '/' + req.file.filename;
                var update = await recent.findByIdAndUpdate(req.body.Editid, req.body);
                if (update) {

                    return res.redirect('/admin/recent/view_recent')
                }
                else {
                    console.log('update unsuscces')
                    return res.redirect('back')
                }
            }
            else {
                req.body.recentImages = oldData.recentImages;
                req.body.upadata_date = new Date().toLocaleString();

                var update = await recent.findByIdAndUpdate(req.body.Editid, req.body)
                if (update) {
                    return res.redirect('/admin/recent/view_recent')
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

// many delete checkbox - item
module.exports.deleteManyRecord = async (req, res) => {
    try {
        if (req.body.deleteallcheck) {
            await recent.deleteMany({ _id: { $in: req.body.deleteallcheck } })
            console.log('Record are susscefully delete');
            return res.redirect('back');

        }
        else {
            console.log('Record are not delete');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}