const additional_furnishing = require("../models/additionalfurnishing.js");
const path = require('path');
const Resize = require('../models/Resize');
const upload = require('../middleware/uploadMiddleware');

// Add
exports.addadditionalfurnishing = (req, res) => {

    const {name} = req.body;
    let errors = '';

    console.log(req.body);

    if (!name) {
        errors = 'Additional Furnishing Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    additional_furnishing.findcname(name, (err, data) => {
        if (data) {
            return res.send({
                success: 500,
                message: "Additional Furnishing already exist.",
                data: []
            });
        } else {

            if (!req.files) {
                return res.send({
                    error: 500,
                    message: 'Image Not Set',
                    data: []
                });
            }

            let image_name = req.files.image;

            console.log("image = " + image_name.name);

            var uploadPath = "realstir/uploads/admin_pictures/" + image_name.name

            image_name.mv(uploadPath, function (err) {

                const imagePath = path.join(__dirname, '../uploads/admin_pictures/thumbs');
                console.log("path" + uploadPath);
                const fileUpload1 = new Resize(imagePath);
                const filename = fileUpload1.save(req.files.image.data, 'thumbimage_' + image_name.name);

                const Additionalfurnishing = new additional_furnishing({
                    name: name,
                    image: image_name.name
                });

                // Save additionalfurnishing in the database
                additional_furnishing.addadditionalfurnishing(Additionalfurnishing, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Additional Furnishing."
                        });
                    else res.send(
                        {
                            message: "Additional Furnishing Added successfully",
                            data: data
                        });
                });
            });
        }
    });
}

// Find a All User
exports.getadditionalfurnishinga = (req, res) => {

    additional_furnishing.getadditionalfurnishinga((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Additional Furnishing."
            });
        else res.send({
            success: 200,
            message: "All Additional Furnishing Data Display",
            data: data
        });
    });

}

//multiple additionalfurnishing delete
exports.madditional_furnishingdelete = (req, res) => {

    console.log(req.body.chk);
    additional_furnishing.madditional_furnishingdelete(req.body.chk, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Additional Furnishing."
            });
        else res.send({
            success: 200,
            message: `All Additional Furnishing were deleted successfully!`,
        });
    });
};

// Delete a additional_furnishing with the specified additional_furnishing id in the request
exports.sadditional_furnishingdelete = (req, res) => {

    const {additional_furnishing_id} = req.body;
    let errors = '';
    console.log(JSON.stringify(req.body))
    if (!additional_furnishing_id) {
        errors = 'Additional Furnishing Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    additional_furnishing.sadditional_furnishingdelete(additional_furnishing_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Additional Furnishing with id ` + additional_furnishing_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Additional Furnishing with id " + additional_furnishing_id
                });
            }
        } else res.send({
            success: 200,
            message: `Additional Furnishing was deleted successfully!`
        });
    });
};

// Find a single data
exports.additionalfurnishingdetail = (req, res) => {

    const {additionalfurnishing_id} = req.body;
    console.log(JSON.stringify( req.body))
    let errors = '';
    if (!additionalfurnishing_id) {
        errors = 'Additional Furnishing Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }
    additional_furnishing.findById(additionalfurnishing_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found id ${additionalfurnishing_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving id " + additionalfurnishing_id
                });
            }

        } else {

            res.send({
                success: 200,
                message: "Additional Furnishing Data Display",
                data: data
            });
        }

    });

};

// edit
exports.edit_additionalfurnishing = (req, res) => {
    const {
        additionalfurnishing_id,
        name
    } = req.body;

    let errors = '';

    if (!additionalfurnishing_id) {
        errors = 'Additional Furnishing Id is required.';
    } else if (!name) {
        errors = 'Additional Furnishing Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    additional_furnishing.CheckName(name, additionalfurnishing_id, (err, data1) => {
        if (data1) {
            return res.send({
                success: 500,
                message: 'Name already exist.',
                data: []
            });
        } else {

            if (!req.files || req.files.length === 0) {
                return res.send({
                    error: "yes",
                    message: 'Image Not Set',
                    data: []
                });
            }

            let image_name = req.files.image;

            console.log("image = " + image_name.name);

            var uploadPath = "realstir/uploads/admin_pictures/" + image_name.name

            image_name.mv(uploadPath, function (err) {

                const imagePath = path.join(__dirname, '../uploads/admin_pictures/thumbs');
                console.log("path" + uploadPath);
                const fileUpload1 = new Resize(imagePath);
                const filename = fileUpload1.save(req.files.image.data, 'thumbimage_' + image_name.name);

                additional_furnishing.edit_additionalfurnishing(additionalfurnishing_id, name, image_name.name, (err, data) => {
                    return res.send({
                        success: "yes",
                        message: 'Additional Furnishing is updated successfully.',
                        data: data
                    })
                })
            })
        }
    })

};