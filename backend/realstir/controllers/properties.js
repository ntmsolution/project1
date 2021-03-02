const Properties = require("../models/properties.js");

// Add Properties
exports.addproperties = (req, res) => {

    const {propertytype, propertiesubtype, name, address, amount, saleablearea, ownerdetails, date, status} = req.body;
    let errors = '';

    console.log(req.body);

    if (!propertytype) {
        errors = 'Property Type is required.';
    } else if (!propertiesubtype) {
        errors = 'propertiesubtype is required.';
    } else if (!name) {
        errors = 'name is required.';
    } else if (!address) {
        errors = 'address is required.';
    } else if (!amount) {
        errors = 'amount is required.';
    } else if (!saleablearea) {
        errors = 'saleablearea is required.';
    } else if (!ownerdetails) {
        errors = 'ownerdetails is required.';
    } else if (!date) {
        errors = 'date is required.';
    } else if (!status) {
        errors = 'status is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    const properties = new Properties({
        propertytype: propertytype,
        propertiesubtype: propertiesubtype,
        name: name,
        address: address,
        amount: amount,
        saleablearea: saleablearea,
        ownerdetails: ownerdetails,
        date: date,
        status: status
    });

    // Save properties in the database
    Properties.addproperties(properties, (err, data) => {
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
}

// Find a All User
exports.getproperties = (req, res) => {

    Properties.getproperties((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send({
            success: 200,
            message: "All Properties Data Display",
            data: data
        });
    });

}

//multiple user delete
exports.mpropertiesdelete = (req, res) => {

    console.log(req.body.chk);
    Properties.mpropertiesdelete(req.body.chk, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        else res.send({
            success: 200,
            message: `All Properties were deleted successfully!`,
        });
    });
};

// Delete a Properties with the specified Properties id in the request
exports.spropertiesdelete = (req, res) => {

    const {properties_id} = req.body;
    let errors = '';
    console.log(JSON.stringify(req.body))
    if (!properties_id) {
        errors = 'Properties Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Properties.spropertiesdelete(properties_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Properties with id ` + properties_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Properties with id " + properties_id
                });
            }
        } else res.send({
            success: 200,
            message: `properties was deleted successfully!`
        });
    });
};

// Find a single data
exports.propertiesdetail = (req, res) => {

    const {properties_id} = req.body;
    let errors = '';
    if (!properties_id) {
        errors = 'Property Type Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }
    Properties.findById(properties_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${properties_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + properties_id
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
exports.edit_properties = (req, res) => {
    const {
        id,
        name,
        image
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


    if (!req.files || req.files.length === 0) {
        return res.send({
            error: 500,
            message: 'Image Not Set',
            data: []
        });
    }

    Properties.edit_properties(id, name, image, (err, data) => {
        return res.send({
            success: 200,
            message: 'Property Type is updated successfully.',
            data: data
        })
    })

};

// Update a verify_ identified by the Id in the request
exports.verify_status_update = (req, res) => {
    const {id, is_verified} = req.body;

    console.log(JSON.stringify(req.body))
    let errors = '';
    if (!id) {
        errors = 'Id is required.';
    } else if (!is_verified) {
        errors = 'is_verified is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    if (is_verified === 1){
        var s = 1;//Disapprove
    }else {
        var s = 0;//Approve
    }

    Properties.verify_status_update(id, s, (err, data) => {

        console.log(JSON.stringify(data))
        return res.send({
            success: 200,
            message: 'updated successfully.',
            data: data
        })
    })
};

//multiple user status change
exports.mverifystatuschange = (req, res) => {

    console.log(req.body.chk);
    Properties.mverifystatuschange(req.body.chk,0,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Data."
            });
        else res.send({
            success:200,
            message: `All Data Updated successfully!`,
        });
    });
};

//multiple user status change
exports.munverifystatuschange = (req, res) => {

    console.log(req.body.chk);
    Properties.mverifystatuschange(req.body.chk,1,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Data."
            });
        else res.send({
            success:200,
            message: `All Data Updated successfully!`,
        });
    });
};