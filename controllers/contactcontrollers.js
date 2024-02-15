const contact = require('../models/contact');

module.exports.view_contact = async (req, res) => {
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
        perPage = 2;

        let contactdata = await contact.find({
            $or: [
                { 'email': { $regex: '.*' + search + '.*', $options: 'i' } }

            ]
        })
        .limit(perPage)
        .skip(perPage * page);

        let totalcontactData = await contact.find({
            $or: [
                { 'email': { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();

        // console.log(commentdata);
        if (contactdata) {
            return res.render('contact/view_contact', {
                contactdata: contactdata,
                search: search,
                totalDocument: Math.ceil(totalcontactData / perPage),
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
            let activeData = await contact.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let activeData = await contact.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.deletecontactdata = async (req, res) => {
    // await adminmodel.findByIdAndDelete(req.params.id);
    // return res.redirect('back')
    try {
        if (req.params.id) {
            let deletedata = await contact.findByIdAndDelete(req.params.id, ({}));
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