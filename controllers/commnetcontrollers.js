const comment = require('../models/comment');


// view comment data
module.exports.view_comment = async (req, res) => {
    try {

        // searching logic
        let search = '';
        if (req.query.serch) {
            search = req.query.search;
        }

        // pagenation logic
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }
        perPage = 5;

        let commentdata = await comment.find({
            $or: [
                { 'email': { $regex: '.*' + search + '.*', $options: 'i' } }

            ]
        }).populate('postId').limit(perPage).skip(perPage * page).exec();

        let totalcommentData = await comment.find({
            $or: [
                { 'email': { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();

        // console.log(commentdata);
        if (commentdata) {
            return res.render('comment/view_comment', {
                commentdata: commentdata,
                search: search,
                totalDocument: Math.ceil(totalcommentData / perPage),
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
            let activeData = await comment.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let activeData = await comment.findByIdAndUpdate(req.params.id, { isActive: true });
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

// delete comment data
module.exports.deletecommentdata = async (req, res) => {
    try {
        if (req.params.id) {
            let deletedata = await comment.findByIdAndDelete(req.params.id, ({}));
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

// delete many checkbox - item
module.exports.deleteManyRecord = async (req, res) => {
    try {
        if (req.body.deleteallcheck) {
            await comment.deleteMany({ _id: { $in: req.body.deleteallcheck } });
            console.log('Record are sussucefully delete');
            return res.redirect('back');
        }
        else {
            console.log('Record are not delete');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}