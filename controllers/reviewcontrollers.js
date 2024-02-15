const review = require('../models/review');


// show review page
module.exports.add_review = async (req, res) => {
    return res.render('review/add_review');
}

// Insert review data
module.exports.insertreviewdata = async (req, res) => {
    // console.log(req.body);
    try {
        if (req.body) {
            req.body.isActive = true
            req.body.created_date = new Date().toLocaleString();
            req.body.upadata_date = new Date().toLocaleString();
            let reviewData = await review.create(req.body);
            if (reviewData) {
                console.log('Review Data Insert Sussfully');
                return res.redirect('/admin/dashbord');
            }
            else {
                console.log('Review Data Not Inserted')
                return res.redirect('back')
            }
        }
        else {
            console.log('something Wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// View review data
module.exports.view_review = async (req, res) => {
    try {

        // serching logic
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

        let reviewdata = await review.find({
            $or: [
                { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'city': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        })
            .limit(perPage)
            .skip(perPage * page);

        let totalreviewData = await review.find({
            $or: [
                { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'city': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();

        if (reviewdata) {
            return res.render('review/view_review', {
                reviewdata: reviewdata,
                search: search,
                totalDocument: Math.ceil(totalreviewData / perPage),
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
            let activeData = await review.findByIdAndUpdate(req.params.id, ({ isActive: false }));
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
            let activeData = await review.findByIdAndUpdate(req.params.id, ({ isActive: true }));
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

// delete review data
module.exports.deletereviewdata = async (req, res) => {
    try {
        if (req.params.id) {
            let deletedata = await review.findByIdAndDelete(req.params.id, ({}));
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

// update review data
module.exports.updatereviewdata = async (req, res) => {
    try {
        if (req.params.id) {
            let record = await review.findById(req.params.id);
            if (record) {
                return res.render('review/update_review', {
                    reviewdata: record,
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

// edit review data
module.exports.editreviewdata = async (req, res) => {
    try {
        let oldData = await review.findById(req.body.Editid);
        if (oldData) {

            req.body.upadata_date = new Date().toLocaleString();

            var update = await review.findByIdAndUpdate(req.body.Editid, req.body)
            if (update) {
                return res.redirect('/admin/review/view_review')
            }
            else {
                console.log('update unsuscces')
                return res.redirect('back')
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

// delete many checkbox - item
module.exports.deleteManyRecord = async (req, res) => {
    try {
        if (req.body.deleteallcheck) {
            await review.deleteMany({ _id: { $in: req.body.deleteallcheck } });
            console.log('Record are susscefully delete');
            return res.redirect('back')
        }
        else{
            console.log('Record are not delete');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}