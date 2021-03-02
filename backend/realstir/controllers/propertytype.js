const Propertytype = require("../models/propertytype.js");

// Add
exports.addpropertytype = (req, res) => {

    const {name} = req.body;
    let errors = '';

    console.log(req.body);

    if (!name) {
        errors = 'Property Type Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Propertytype.findcname(name, (err, data) => {
        if (data) {
            return res.send({
                success: 500,
                message: "Property Type already exist.",
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

                const propertytype = new Propertytype({
                    name : name,
                    image: profilepic.name
                });

                // Save propertytype in the database
                Propertytype.addpropertytype(propertytype, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Property Type."
                        });
                    else res.send(
                        {
                            message: "Property Type Added successfully",
                            data: data
                        });
                });
            });
        }
    });
}

// Find a All User
exports.getpropertytype = (req, res) => {

    Propertytype.getpropertytype((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send({
            success:200,
            message: "All Propertytype Data Display",
            data: data
        });
    });

}

//multiple user delete
exports.mpropertytypedelete = (req, res) => {

    console.log(req.body.chk);
    Propertytype.mpropertytypedelete(req.body.chk,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        else res.send({
            success:200,
            message: `All Propertytype were deleted successfully!`,
        });
    });
};

// Delete a Propertytype with the specified Propertytype id in the request
exports.spropertytypedelete = (req, res) => {

    const {propertytype_id} = req.body;
    let errors = '';
    console.log(JSON.stringify(req.body))
    if (!propertytype_id) {
        errors = 'Propertytype Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Propertytype.spropertytypedelete(propertytype_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Propertytype with id ` + propertytype_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Propertytype with id " + propertytype_id
                });
            }
        } else res.send({
            success:200,
            message: `propertytype was deleted successfully!`
        });
    });
};

// Find a single data
exports.propertytypedetail = (req, res) => {

    const {propertytype_id} = req.body;
    let errors = '';
    if (!propertytype_id) {
        errors = 'Property Type Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }
    Propertytype.findById(propertytype_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${propertytype_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + propertytype_id
                });
            }

        } else {

            res.send({
                success: 200,
                message: "Property Type Data Display",
                data: data
            });
        }

    });

};

// edit
exports.edit_propertytype = (req, res) => {
    const {
        id,
        name
    } = req.body;

    let errors = '';

    if (!id) {
        errors = 'Property Type Id is required.';
    } else if (!name) {
        errors = 'Property Type Name is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

   /* Propertytype.CheckName(name, (err, data1) => {
        if (data1) {
            return res.send({
                success: 500,
                message: 'Name already exist.',
                data: []
            });
        } else {*/

            if (!req.files || req.files.length === 0) {
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

                Propertytype.edit_propertytypes(id, name, image_name.name, (err, data) => {
                    return res.send({
                        success:200,
                        message: 'Property Type is updated successfully.',
                        data: data
                    })
                })
            /*})
        }*/
    })

};