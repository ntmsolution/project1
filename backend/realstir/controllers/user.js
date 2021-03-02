const User = require("../models/user.js");

// Find a All User
exports.getuserdata = (req, res) => {

    User.alluser((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send({
            success:200,
            message: "All User Data Display",
            data: data
        });
    });

}

//multiple user delete
exports.muserdelete = (req, res) => {

    console.log(req.body.chk);
    User.muserdelete(req.body.chk,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        else res.send({
            success:200,
            message: `All User were deleted successfully!`,
        });
    });
};

// Delete a Category with the specified CategoryId in the request
exports.suserdelete = (req, res) => {

    const {user_id} = req.body;
    let errors = '';

    if (!user_id) {
        errors = 'User Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    USer.suserdelete(user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ` + user_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Category with id " + user_id
                });
            }
        } else res.send({
            success:200,
            message: `User was deleted successfully!`
        });
    });
};

// Update a User identified by the UserId in the request
exports.approve_status_update = (req, res) => {
    const {admin_id, status} = req.body;

    console.log(JSON.stringify(req.body))
    let errors = '';
    if (!admin_id) {
        errors = 'User Id is required.';
    } else if (!status) {
        errors = 'Status is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    if (status === 1){
        var s = 1;//Disapprove
    }else {
        var s = 0;//Approve
    }

    User.approve_status_update(admin_id, s, (err, data) => {

        console.log(JSON.stringify(data))
        return res.send({
            success: 200,
            message: 'Profile is updated successfully.',
            data: data
        })
    })
};

//multiple user approve status change
exports.mauserstatuschange = (req, res) => {

    console.log(req.body.chk);
    User.muserstatuschange(req.body.chk,1,(err, data) => {
        console.log(data)
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all User."
            });
        else res.send({
            success:200,
            message: `All User Updated successfully!`,
        });
    });
};

//multiple user disapprove status change
exports.mduserstatuschange = (req, res) => {

    console.log(req.body.chk);
    User.muserstatuschange(req.body.chk,0,(err, data) => {
        console.log(data)
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        else res.send({
            success:200,
            message: `All User Updated successfully!`,
        });
    });
};