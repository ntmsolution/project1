const Category = require("../models/category.js");
const path = require('path');
const Resize = require('../models/Resize');
// Create and Save a new Category
exports.addcategory = (req, res) => {
    const {category_name, category_image} = req.body;
    let errors = '';

    if (!category_name) {
        errors = 'Category Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Category.findcname(category_name,(err, data) => {
        if (data) {
            return res.send({
                success: "no",
                message: "Category already exist.",
                data: []
            });
        } else {

            if (!req.files || Object.keys(req.files).length === 0) {
                return res.send({
                    error: "yes",
                    message: '',
                    data: []
                });
            }

            let categorypic = req.files.category_image;

            console.log(categorypic.name);

            var uploadPath = "app/uploads/admin_pictures/" + categorypic.name

            categorypic.mv(uploadPath, function (err) {

                const imagePath = path.join(__dirname, '../uploads/admin_pictures/thumbs');
                console.log(uploadPath);
                const fileUpload1 = new Resize(imagePath);
                const filename = fileUpload1.save(req.files.category_image.data, 'thumbimage_' + categorypic.name);
            });

            const category = new Category({
                category_name: category_name,
                category_image: categorypic.name
            });

            // Save Category in the database
            Category.addcategory(category, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Category."
                    });
                else res.send(
                    {
                        message: "Category Added successfully",
                        categorydata: data
                    });
            });
        }
    });
}

// Find a All Category
exports.allcategory = (req, res) => {

    const{search_text}=req.body;

    var sTest = '';

    if(search_text !=undefined && search_text !="")
    {
        sTest = search_text;
    }

    Category.allcategory(sTest,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Category."
            });
        else res.send({
            message: "All Category Data Display",
            categorydata: data
        });
    });
}

// Delete a Category with the specified CategoryId in the request
exports.categorydelete = (req, res) => {

    const {category_id} = req.body;
    let errors = '';

    if (!category_id) {
        errors = 'Category Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Category.categorydelete(category_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ` + category_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Category with id " + category_id
                });
            }
        } else res.send({
            message: `Category was deleted successfully!`
        });
    });
};
