const slider = require('../models/slider');

const fs = require('fs');

const path = require('path');

//  show slider from
module.exports.add_slider = async (req, res) => {
    return res.render('slider/add_slider');
    // console.log('slider');
}

// insert slider data
module.exports.insertsliderdata = async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);

    try {
        let imgPath = ' ';
        if (req.file) {
            imgPath = slider.imagesliderPath + '/' + req.file.filename;
        }
        req.body.sliderImages = imgPath;
        req.body.isActive = true
        req.body.created_date = new Date().toLocaleString();
        req.body.upadata_date = new Date().toLocaleString();
        let sliderData = await slider.create(req.body);
        if (sliderData) {
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

// view slider data
module.exports.view_slider = async (req, res) => {
    try {
        // searching logic
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        // pagination logic
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0;
        }
        var perPage = 1;
        let sliderdata = await slider.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'link': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        })
        .limit(perPage)
        .skip(perPage*page);

        let totalSliderdata = await slider.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'link': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();
        if (sliderdata) {
            return res.render('slider/view_slider', {
                sliderdata: sliderdata,
                search: search,
                totalDocument : Math.ceil(totalSliderdata/perPage),
                currentPage : page,
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
            let activeData = await slider.findByIdAndUpdate(req.params.id, ({ isActive: false }));
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
            let activeData = await slider.findByIdAndUpdate(req.params.id, ({ isActive: true }));
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

// delate slider data
module.exports.deletesliderdata = async (req, res) => {
    try {
        if (req.params.id) {
            let deletedata = await slider.findByIdAndDelete(req.params.id, ({}));
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

// update slider data
module.exports.updatesliderdata = async (req, res) => {
    try {
        if (req.params.id) {
            let record = await slider.findById(req.params.id, ({}));
            if (record) {
                return res.render('slider/update_slider', {
                    sliderdata: record,
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

//edit slider data
module.exports.editsliderdata = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    try {
        let oldData = await slider.findById(req.body.Editid);
        if (oldData) {
            if (req.file) {
                var fullpath = path.join(__dirname, "..", oldData.sliderImages);
                await fs.unlinkSync(fullpath);

                req.body.upadata_date = new Date().toLocaleString();
                req.body.sliderImages = slider.imagesliderPath + '/' + req.file.filename;
                var update = await slider.findByIdAndUpdate(req.body.Editid, req.body);
                if (update) {

                    return  res.redirect('/admin/slider/view_slider')
                }
                else {
                    console.log('update unsuscces')
                    return res.redirect('back')
                }
            }
            else {
                req.body.sliderImages = oldData.sliderImages;
                req.body.upadata_date = new Date().toLocaleString();

                var update = await slider.findByIdAndUpdate(req.body.Editid, req.body)
                if (update) {
                    return res.redirect('/admin/slider/view_slider')
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

// multipal delete with checkbox
module.exports.deleteManyRecord = async (req, res) => {
    // console.log(req.body);
    try {
        if (req.body.deleteallcheck) {
            await slider.deleteMany({ _id: { $in: req.body.deleteallcheck } });
            console.log('Record are susscefully delete');
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
