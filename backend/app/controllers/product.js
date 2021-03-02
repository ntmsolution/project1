const Product = require("../models/product");
const path = require('path');
const Resize = require('../models/Resize');

exports.addproduct = (req, res) => {

    const {category_id, city_id, state_id, country_id, product_name, product_price, product_description, product_image, product_qty} = req.body;
    let errors = '';

    if (!category_id) {
        errors = 'Category id is required.';
    } else if (!city_id) {
        errors = 'City id is required.';
    } else if (!state_id) {
        errors = 'State id is required.';
    } else if (!country_id) {
        errors = 'Country id is required.';
    } else if (!product_name) {
        errors = 'Product Name is required.';
    } else if (!product_price) {
        errors = 'Product Price is required.';
    } else if (!product_description) {
        errors = 'Product Description is required.';
    } else if (!product_qty) {
        errors = 'Product Qty is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Product.findproduct(category_id, product_name, (err, data) => {
        if (data) {
            return res.send({
                success: "no",
                message: "Product already exist.",
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

            let productypic = req.files.product_image;

            console.log(productypic.name);

            var uploadPath = "app/uploads/product_pictures/" + productypic.name

            productypic.mv(uploadPath, function (err) {

                const imagePath = path.join(__dirname, '../uploads/product_pictures/thumbs');
                console.log(uploadPath);
                const fileUpload1 = new Resize(imagePath);
                const filename = fileUpload1.save(req.files.product_image.data, 'thumbimage_' + productypic.name);
            });

            const product = new Product({
                category_id: category_id,
                city_id: city_id,
                state_id: state_id,
                country_id: country_id,
                product_name: product_name,
                product_price: product_price,
                product_description: product_description,
                product_image: productypic.name,
                product_qty: product_qty
            });

            // Save Product in the database
            Product.addproduct(product, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Product."
                    });
                else res.send(
                    {
                        message: "Product Added successfully",
                        vanuedata: data
                    });
            });
        }
    });


};

exports.allproduct = (req, res) => {

    var page = req.body.pages

    var pages = parseInt(page);

    var limit = '5';

    if (pages == '') {
        pages = 1;
        sp = 0;
    } else {
        pages = pages;
        sp = (pages - 1) * limit;
    }

    Product.alllistlengthproduct((err, data) => {
        console.log(data.length);
        var getcount = data.length;
        var totalpage = Math.ceil(getcount / limit);

        Product.allproduct(sp, limit, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Vanue."
                });
            else {

                var product_data_detail = [];

                for (let i = 0; i < data.length; i++) {

                    product_data_detail.push({
                        id: data[i].id,
                        category_id: data[i].category_name,
                        city_id: data[i].city_name,
                        state_id: data[i].state_name,
                        country_id: data[i].country_name,
                        product_name: data[i].product_name,
                        product_price: data[i].product_price,
                        product_description: data[i].product_description,
                        product_image: "http://localhost:3000/" +data[i].product_image,
                        product_qty: data[i].product_qty
                    });

                }
                res.send({
                    message: "All User Data Display",
                    productdata: product_data_detail,
                    current_page: pages,
                    total_page: totalpage
                });
            }
        });
    });
};

exports.productdetail = (req, res) => {

    const {product_id} = req.body;
    let errors = '';

    if (!product_id) {
        errors = "Product id is required...";
    }
    if (errors.length > 0) {
        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Product.findById(product_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${product_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + product_id
                });
            }

        } else {

            Product.mproduct(product_id, (err, productimage) => {
                console.log("data = " + JSON.stringify(productimage));
                res.send({
                    message: "Product Data Display",
                    productdetails: {data,productimage}
                });
            });
        }
    });
};

exports.productupdate = (req, res) => {

    const {product_id, category_id, city_id, state_id, country_id, product_name, product_price, product_description, product_image, product_qty} = req.body;
    let errors = '';

    if (!product_id) {
        errors = 'Product id is required.';
    } else if (!category_id) {
        errors = 'Category id is required.';
    } else if (!city_id) {
        errors = 'City id is required.';
    } else if (!state_id) {
        errors = 'State id is required.';
    } else if (!country_id) {
        errors = 'Country id is required.';
    } else if (!product_name) {
        errors = 'Product Name is required.';
    } else if (!product_price) {
        errors = 'Product Price is required.';
    } else if (!product_description) {
        errors = 'Product Description is required.';
    } else if (!product_image) {
        errors = 'Product Image is required.';
    } else if (!product_qty) {
        errors = 'Product Qty is required.';
    }


    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Product.productupdateById(product_id, category_id, city_id, state_id, country_id, product_name, product_price, product_description, product_image, product_qty, (err, data) => {

        console.log(data);
        if (data > 0) {
            return res.send({
                success: "No",
                message: 'Product Not updated successfully.',
                productdata: data
            })
        } else {
            return res.send({
                success: "yes",
                message: 'Product is updated successfully.',
                productdata: data
            })
        }
    });
};

exports.productdelete = (req, res) => {

    const {product_id} = req.body;
    let errors = '';

    if (!product_id) {
        errors = 'Product id is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Product.productdelete(product_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ` + product_id
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + product_id
                });
            }
        } else res.send({
            message: `Product was deleted successfully!`,
        });
    });
};
