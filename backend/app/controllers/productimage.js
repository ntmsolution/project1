const productimage = require("../models/productimage");
const path = require('path');
const Resize = require('../models/Resize');

exports.addproductimage = (req, res) => {

    const {product_id, image} = req.body;
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
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.send({
            error: "yes",
            message: '',
            data: []
        });
    }

    let productypic = req.files.image;

    console.log(productypic.name);

    var uploadPath = "app/uploads/product_pictures/" + productypic.name

    productypic.mv(uploadPath, function (err) {

        const imagePath = path.join(__dirname, '../uploads/product_pictures/thumbs');
        console.log("uploadpath = " + uploadPath);
        const fileUpload1 = new Resize(imagePath);
        const filename = fileUpload1.save(req.files.image.data, 'thumbimage_' + productypic.name);
    });

    const Productimage = new productimage({
        product_id: product_id,
        image: productypic.name
    });

    console.log(Productimage);

    productimage.addproductimage(Productimage, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the productimage."
            });
        else res.send(
            {
                message: "productimage Added successfully",
                productimagedata: data
            });
    });
};

exports.allproductimage = (req, res) => {

    productimage.allproductimage((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving productimage."
            });
        } else {

            var image_data = [];

            for (let i = 0; i < data.length; i++) {

                image_data.push({
                    id: data[i].id,
                    product_id: data[i].product_id,
                    image: "http://localhost:3000/product_pictures/" +data[i].image
                });

                console.log(image_data);

            }
            res.send({
                message: "All productimage Data Display",
                productimagedata: image_data
            });
        }
    });

};

exports.productimagedelete = (req, res) => {

    const {image_product_id} = req.body;
    let errors = '';

    if (!image_product_id) {
        errors = 'Image Product Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    productimage.productimagedelete(image_product_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found productimage with id ` + image_product_id
                });
            } else {
                res.status(500).send({
                    message: "Could not delete productimage with id " + image_product_id
                });
            }
        } else res.send({
            message: `Product Image was deleted successfully!`,
        });
    });
};
