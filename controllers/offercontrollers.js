const { mongo } = require('mongoose');
const offer = require('../models/offer');

module.exports.add_offer = async (req, res) => {
    return res.render('offer/add_offer')
}

// insert offer data
module.exports.insertOfferdata = async (req, res) => {
    // console.log(req.body);
    try {
        if (req.body) {
            req.body.isActive = true
            req.body.created_date = new Date().toLocaleString();
            req.body.upadata_date = new Date().toLocaleString();
            let offerData = await offer.create(req.body);
            if (offerData) {
                console.log('Offer Insert Sussfully');
                return res.redirect('/admin/dashbord');
            }
            else {
                console.log('Offer Not Inserted');
                return res.redirect('back');
            }
        }
        else {
            console.log('something Wrong');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// view offer data
module.exports.view_offer = async (req, res) => {
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

        let offerdata = await offer.find({
            $or: [
                { 'icon': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        })
            .limit(perPage)
            .skip(perPage * page);

        let totalofferData = await offer.find({
            $or: [
                { 'icon': { $regex: '.*' + search + '.*', $options: 'i' } },
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();

        if (offerdata) {
            return res.render('offer/view_offer', {
                offerdata: offerdata,
                search: search,
                totalDocument: Math.ceil(totalofferData / perPage),
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
            let activeData = await offer.findByIdAndUpdate(req.params.id, ({ isActive: false }));
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
            let activeData = await offer.findByIdAndUpdate(req.params.id, ({ isActive: true }));
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

// delete offer data
module.exports.deleteofferdata = async (req, res) => {
    try {
        if (req.params.id) {
            let deletedata = await offer.findByIdAndDelete(req.params.id, ({}));
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

// update offer data
module.exports.updateofferdata = async (req, res) => {
    try {
        if (req.params.id) {
            let record = await offer.findById(req.params.id, ({}));
            if (record) {
                return res.render('offer/update_offer', {
                    offerdata: record,
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

// edit offer data
module.exports.editofferdata = async (req, res) => {
    try {
        let oldData = await offer.findById(req.body.Editid);
        if (oldData) {

            req.body.upadata_date = new Date().toLocaleString();

            var update = await offer.findByIdAndUpdate(req.body.Editid, req.body)
            if (update) {
                return res.redirect('/admin/offer/view_offer')
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

// many delete checkbox - item
module.exports.deleteManyRecord = async (req, res) => {
    try{
        if(req.body.deleteallcheck)
        {
            await offer.deleteMany({_id: {$in: req.body.deleteallcheck}});
            console.log('Record are susscefully delete');
            return res.redirect('back')
        }
        else{
            console.log('Record are not delete');
            return res.redirect('back')
        }

    }

    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}