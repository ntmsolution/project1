const Additionalrooms = require("../models/additionalrooms.js");

// Add
exports.addadditionalrooms = (req, res) => {

    const {name} = req.body;
    let errors = '';

    console.log(req.body);

    if (!name) {
        errors = 'Additional Rooms Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Additionalrooms.findcname(name, (err, data) => {
        if (data) {
            return res.send({
                success: 500,
                message: "Additional Rooms already exist.",
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

                const additionalrooms = new Additionalrooms({
                    name : name,
                    image: profilepic.name
                });

                // Save additionalrooms in the database
                Additionalrooms.addadditionalrooms(additionalrooms, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Additional Rooms."
                        });
                    else res.send(
                        {
                            message: "Additional Rooms Added successfully",
                            data: data
                        });
                });
            });
        }
    });
}

// Find a All User
exports.getadditionalrooms = (req, res) => {

    Additionalrooms.getadditionalrooms((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send({
            success:200,
            message: "All Additionalrooms Data Display",
            data: data
        });
    });

}

//multiple user delete
exports.madditionalroomsdelete = (req, res) => {

    console.log(req.body.chk);
    Additionalrooms.madditionalroomsdelete(req.body.chk,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        else res.send({
            success:200,
            message: `All Additionalrooms were deleted successfully!`,
        });
    });
};

// Delete a Additionalrooms with the specified Additionalrooms id in the request
exports.sadditionalroomsdelete = (req, res) => {

    const {additionalrooms_id} = req.body;
    let errors = '';
    console.log(JSON.stringify(req.body))
    if (!additionalrooms_id) {
        errors = 'Additionalrooms Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Additionalrooms.sadditionalroomsdelete(additionalrooms_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Additionalrooms with id ` + additionalrooms_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Additionalrooms with id " + additionalrooms_id
                });
            }
        } else res.send({
            success:200,
            message: `additionalrooms was deleted successfully!`
        });
    });
};

// Find a single data
exports.additionalroomsdetail = (req, res) => {

    const {additionalrooms_id} = req.body;
    let errors = '';
    if (!additionalrooms_id) {
        errors = 'Additional Rooms Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }
    Additionalrooms.findById(additionalrooms_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${additionalrooms_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + additionalrooms_id
                });
            }

        } else {

            res.send({
                success: 200,
                message: "Additional Rooms Data Display",
                data: data
            });
        }

    });

};

// edit
exports.edit_additionalrooms = (req, res) => {
    const {
        additionalrooms_id,
        name
    } = req.body;

    let errors = '';

    if (!additionalrooms_id) {
        errors = 'Additional Rooms Id is required.';
    } else if (!name) {
        errors = 'Additional Rooms Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Additionalrooms.CheckName(name, additionalrooms_id, (err, data1) => {
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

                Additionalrooms.edit_additionalrooms(additionalrooms_id, name, image_name.name, (err, data) => {
                    return res.send({
                        success: "yes",
                        message: 'Additional Rooms is updated successfully.',
                        data: data
                    })
                })
            })
        }
    })

};