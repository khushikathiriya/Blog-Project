const category = require('../models/category');

const subcategory = require('../models/subcategory');


// show subcategory page
module.exports.add_subcategory = async (req, res) => {
    try {
        let categorydata = await category.find({});
        if (categorydata) {
            return res.render('subcategory/add_subcategory', {
                categorydata: categorydata,
            });
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// insert subcategory data
module.exports.insertsubcategorydata = async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    try {
        let imgPath = ' ';
        if (req.file) {
            imgPath = subcategory.imagesubcategoryPath + '/' + req.file.filename;
        }
        req.body.subcategory_image = imgPath;
        req.body.isActive = true
        req.body.created_date = new Date().toLocaleString();
        req.body.upadata_date = new Date().toLocaleString();
        let subcategoryData = await subcategory.create(req.body);
        if (subcategoryData) {
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

// view sub-category data
module.exports.view_subcategory = async (req, res) => {
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

        let subcategorydata = await subcategory.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).populate("category_id").limit(perPage).skip(perPage * page).exec();

        let totalsubcategortData = await subcategory.find({
            $or: [
                { 'title': { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }).countDocuments();

        if (subcategorydata) {
            return res.render('subcategory/view_subcategory', {
                subcat: subcategorydata,
                search: search,
                totalDocument: Math.ceil(totalsubcategortData / perPage),
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
            let activeData = await subcategory.findByIdAndUpdate(req.params.id, ({ isActive: false }));
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
            let activeData = await subcategory.findByIdAndUpdate(req.params.id, ({ isActive: true }));
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

// delete category data
module.exports.deletecategorydata = async (req, res) => {
    try {
        let deletedata = await subcategory.findByIdAndDelete(req.params.id, ({}));
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
            let record = await subcategory.findById(req.params.id).populate("category_id").exec();
            // console.log(record)
            var categoryData = await category.find({ isActive: true })
            if (record) {
                return res.render('subcategory/update_subcategory', {
                    subcategoryData: record,
                    categoryData: categoryData
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

// edit sub categroy data
module.exports.editsubcategorydata = async (req, res) => {
    try {
        let oldData = await subcategory.findById(req.body.Editid);
        if (oldData) {
            if (req.file) {
                var fullpath = path.join(__dirname, "..", oldData.subcategory_image);
                await fs.unlinkSync(fullpath);

                req.body.upadata_date = new Date().toLocaleString();
                req.body.subcategory_image = subcategory.imagesubcategoryPath + '/' + req.file.filename;
                var update = await subcategory.findByIdAndUpdate(req.body.Editid, req.body);
                if (update) {

                    return res.redirect('/admin/subcategory/view_subcategory')
                }
                else {
                    console.log('update unsuscces')
                    return res.redirect('back')
                }
            }
            else {
                req.body.latestImages = oldData.latestImages;
                req.body.upadata_date = new Date().toLocaleString();

                var update = await subcategory.findByIdAndUpdate(req.body.Editid, req.body)
                if (update) {
                    return res.redirect('/admin/subcategory/view_subcategory')
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

// delete many checkbox - item
module.exports.deleteManyRecord = async (req, res) => {
    try {
        if (req.body.deleteallcheck) {
            await subcategory.deleteMany({ _id: { $in: req.body.deleteallcheck } });
            console.log('Record are susscefully delete');
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