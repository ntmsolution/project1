const Amenities = require("../models/amenities.js");

// Add
exports.addamenities = (req, res) => {

    const {name} = req.body;
    let errors = '';

    console.log(req.body);

    if (!name) {
        errors = 'Amenities Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Amenities.findcname(name, (err, data) => {
        if (data) {
            return res.send({
                success: 500,
                message: "Amenities already exist.",
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

            let profilepic = req.files.image;

            console.log("image = " + profilepic.name);

            var uploadPath = "realstir/uploads/admin_pictures/" + profilepic.name

            profilepic.mv(uploadPath, function (err) {

                const imagePath = path.join(__dirname, '../uploads/admin_pictures/thumbs');
                console.log("path" + uploadPath);
                const fileUpload1 = new Resize(imagePath);
                const filename = fileUpload1.save(req.files.image.data, 'thumbimage_' + profilepic.name);

                const amenities = new Amenities({
                    name : name,
                    image: profilepic.name
                });

                // Save amenities in the database
                Amenities.addamenities(amenities, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Amenities."
                        });
                    else res.send(
                        {
                            message: "Amenities Added successfully",
                            data: data
                        });
                });
            });
        }
    });
}

// Find a All User
exports.getamenities = (req, res) => {

    Amenities.getamenities((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send({
            success:200,
            message: "All Amenities Data Display",
            data: data
        });
    });

}

//multiple user delete
exports.mamenitiesdelete = (req, res) => {

    console.log(req.body.chk);
    Amenities.mamenitiesdelete(req.body.chk,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        else res.send({
            success:200,
            message: `All Amenities were deleted successfully!`,
        });
    });
};

// Delete a Amenities with the specified Amenities id in the request
exports.samenitiesdelete = (req, res) => {

    const {amenities_id} = req.body;
    let errors = '';
    console.log(JSON.stringify(req.body))
    if (!amenities_id) {
        errors = 'Amenities Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Amenities.samenitiesdelete(amenities_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Amenities with id ` + amenities_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Amenities with id " + amenities_id
                });
            }
        } else res.send({
            success:200,
            message: `amenities was deleted successfully!`
        });
    });
};

// Find a single data
exports.amenitiesdetail = (req, res) => {

    const {amenities_id} = req.body;
    let errors = '';
    if (!amenities_id) {
        errors = 'Amenities Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }
    Amenities.findById(amenities_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${amenities_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + amenities_id
                });
            }

        } else {

            res.send({
                success: 200,
                message: "Amenities Data Display",
                data: data
            });
        }

    });

};

// edit
exports.edit_amenities = (req, res) => {
    const {
        amenities_id,
        name
    } = req.body;

    let errors = '';

    if (!amenities_id) {
        errors = 'Amenities Id is required.';
    } else if (!name) {
        errors = 'Amenities Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Amenities.CheckName(name, amenities_id, (err, data1) => {
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

                Amenities.edit_amenities(amenities_id, name, image_name.name, (err, data) => {
                    return res.send({
                        success: "yes",
                        message: 'Amenities is updated successfully.',
                        data: data
                    })
                })
            })
        }
    })

};