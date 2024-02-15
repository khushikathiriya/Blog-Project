const category = require('../models/category');

// category page show
module.exports.add_category = async (req, res) => {
    return res.render('category/add_category');
}

// insert category data  
module.exports.insertcategorydata = async (req, res) => {
    // console.log(req.body);
    try {
        if (req.body) {
            req.body.isActive = true
            req.body.created_date = new Date().toLocaleString();
            req.body.upadata_date = new Date().toLocaleString();
            let categoryData = await category.create(req.body);
            if (categoryData) {
                console.log('Category Insert Sussfully');
                return res.redirect('/admin/dashbord');
            }
            else {
                console.log('Category Not Inserted')
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

// view category data
module.exports.view_category = async (req, res) => {
    try {

        // searching logic
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        };

        // pagenation logic
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }

        perPage = 2;

        let categorydata = await category.find({
            $or: [
                { 'category': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        })
            .limit(perPage)
            .skip(perPage * page);

        let totalcategoryData = await category.find({
            $or: [
                { 'category': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();
        if (categorydata) {
            // console.log(categorydata);
            return res.render('category/view_category', {
                categorydata: categorydata,
                search: search,
                totalDocument: Math.ceil(totalcategoryData / perPage),
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
            let activeData = await category.findByIdAndUpdate(req.params.id, ({ isActive: false }));
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
            let activeData = await category.findByIdAndUpdate(req.params.id, ({ isActive: true }));
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

//delete category date
module.exports.deletecategorydata = async (req, res) => {
    try {
        let deletedata = await category.findByIdAndDelete(req.params.id, ({}));
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

// update category data
module.exports.updatecategorydata = async (req, res) => {
    try {
        if (req.params.id) {
            let record = await category.findById(req.params.id, ({}));
            if (record) {
                return res.render('category/update_category', {
                    categorydata: record,
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

// edit category data
module.exports.editcategorydata = async (req, res) => {
    try {
        let oldData = await category.findById(req.body.Editid);
        if (oldData) {

            req.body.upadata_date = new Date().toLocaleString();

            var update = await category.findByIdAndUpdate(req.body.Editid, req.body)
            if (update) {
                return res.redirect('/admin/category/view_category')
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
    try{
        if(req.body.deleteallcheck)
        {
            await category.deleteMany({_id:{$in:req.body.deleteallcheck}});
            console.log('Record are susscefully delete');
            return res.redirect('back');
        }
        else{
            console.log('Record are not delete');
            return res.redirect('back');
        }

    }
    catch(err){
        console.log('Record are not delete');
        return res.redirect('back');
    }
}
