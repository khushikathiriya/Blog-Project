const latest = require('../models/latest');

const fs = require('fs');

const path = require('path');

// show latest post page
module.exports.add_latest = async (req, res) => {
    return res.render('latest/add_latest')
}

// Insert Latest Post Data
module.exports.insertlatestdata = async (req, res) => {
    // console.log(req.file);
    console.log(req.body);
    // console.log(req.user);
    try {
        let imgPath = ' ';
        if (req.file) {
            imgPath = latest.imagelatestPath + '/' + req.file.filename;
        }
        req.body.username = req.user.name;
        req.body.latestImages = imgPath;
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.upadata_date = new Date().toLocaleString();
        let latestData = await latest.create(req.body);
        if (latestData) {
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

// View Latest Post Data
module.exports.view_latest = async (req, res) => {
    try {
        // searching logic
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        // pagenation logic
        if (req.query.page) {
            page = req.query.page
        }
        else {
            page = 0;
        }

        perPage = 2;

        let latestdata = await latest.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'categorized': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        })
            .limit(perPage)
            .skip(perPage * page);

        let TotallatestData = await latest.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'categorized': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();

        if (latestdata) {
            return res.render('latest/view_latest', {
                latestdata: latestdata,
                search: search,
                totalDocument: Math.ceil(TotallatestData / perPage),
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
            let activeData = await latest.findByIdAndUpdate(req.params.id, ({ isActive: false }));
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
            let activeData = await latest.findByIdAndUpdate(req.params.id, ({ isActive: true }));
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

// datete latest post data
module.exports.deletelatestdata = async (req, res) => {
    try {
        let deletedata = await latest.findByIdAndDelete(req.params.id, ({}));
        if (deletedata) {
            console.log('Data sussecsfully Delete')
            return res.redirect('back')
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

// update latest post data
module.exports.updatelatestdata = async (req, res) => {
    try {
        if (req.params.id) {
            let record = await latest.findById(req.params.id);
            if (record) {
                return res.render('latest/update_latest', {
                    postdata: record,
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

//edit latest post data
module.exports.editlatestdata = async (req, res) => {
    try {
        let oldData = await latest.findById(req.body.Editid);
        if (oldData) {
            if (req.file) {
                var fullpath = path.join(__dirname, "..", oldData.latestImages);
                await fs.unlinkSync(fullpath);

                req.body.upadata_date = new Date().toLocaleString();
                req.body.latestImages = latest.imagelatestPath + '/' + req.file.filename;
                var update = await latest.findByIdAndUpdate(req.body.Editid, req.body);
                if (update) {

                    return res.redirect('/admin/latest/view_latest')
                }
                else {
                    console.log('update unsuscces')
                    return res.redirect('back')
                }
            }
            else {
                req.body.latestImages = oldData.latestImages;
                req.body.upadata_date = new Date().toLocaleString();

                var update = await latest.findByIdAndUpdate(req.body.Editid, req.body)
                if (update) {
                    return res.redirect('/admin/latest/view_latest')
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
            await latest.deleteMany({ _id: { $in: req.body.deleteallcheck } });
            console.log('Record are sussfully delete');
            return res.redirect('back');
        }
        else{
            console.log('Record Are not delete');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}