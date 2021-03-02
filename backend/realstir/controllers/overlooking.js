const Overlooking = require("../models/overlooking.js");

// Add
exports.addoverlooking = (req, res) => {

    const {name} = req.body;
    let errors = '';

    console.log(req.body);

    if (!name) {
        errors = 'Overlooking Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Overlooking.findcname(name, (err, data) => {
        if (data) {
            return res.send({
                success: 500,
                message: "Overlooking already exist.",
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

                const overlooking = new Overlooking({
                    name : name,
                    image: profilepic.name
                });

                // Save overlooking in the database
                Overlooking.addoverlooking(overlooking, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Overlooking."
                        });
                    else res.send(
                        {
                            message: "Overlooking Added successfully",
                            data: data
                        });
                });
            });
        }
    });
}

// Find a All User
exports.getoverlooking = (req, res) => {

    Overlooking.getoverlooking((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send({
            success:200,
            message: "All Overlooking Data Display",
            data: data
        });
    });

}

//multiple user delete
exports.moverlookingdelete = (req, res) => {

    console.log(req.body.chk);
    Overlooking.moverlookingdelete(req.body.chk,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        else res.send({
            success:200,
            message: `All Overlooking were deleted successfully!`,
        });
    });
};

// Delete a Overlooking with the specified Overlooking id in the request
exports.soverlookingdelete = (req, res) => {

    const {overlooking_id} = req.body;
    let errors = '';
    console.log(JSON.stringify(req.body))
    if (!overlooking_id) {
        errors = 'Overlooking Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Overlooking.soverlookingdelete(overlooking_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ` + overlooking_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Category with id " + overlooking_id
                });
            }
        } else res.send({
            success:200,
            message: `overlooking was deleted successfully!`
        });
    });
};

// Find a single data
exports.overlookingdetail = (req, res) => {

    const {overlooking_id} = req.body;
    let errors = '';
    if (!overlooking_id) {
        errors = 'Overlooking Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }
    Overlooking.findById(overlooking_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${overlooking_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + overlooking_id
                });
            }

        } else {

            res.send({
                success: 200,
                message: "Overlooking Data Display",
                data: data
            });
        }

    });

};

// edit
exports.edit_overlooking = (req, res) => {
    const {
        overlooking_id,
        name
    } = req.body;

    let errors = '';

    if (!overlooking_id) {
        errors = 'Overlooking Id is required.';
    } else if (!name) {
        errors = 'Overlooking Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Overlooking.CheckName(name, overlooking_id, (err, data1) => {
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

                Overlooking.edit_overlooking(overlooking_id, name, image_name.name, (err, data) => {
                    return res.send({
                        success: "yes",
                        message: 'Overlooking is updated successfully.',
                        data: data
                    })
                })
            })
        }
    })

};