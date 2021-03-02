const Admin = require("../models/admin.js");
const path = require('path');
var nodemailer = require('nodemailer');

//Login User
exports.login_user_data = (req, res) => {

    const {user_name, password} = req.body;
    let errors = '';

    console.log("data = " + + JSON.stringify(req.body));

    if (!user_name) {
        errors = 'username is required.';
    } else if (!password) {
        errors = 'Password is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Admin.loginuser(user_name, password, (err, logindata) => {
        console.log(logindata);

        if (logindata.length > 0) {

            return res.send({
                success: 200,
                message: 'Login successfully! Welcome User ' + user_name,
                data: logindata,
                id:logindata[0].id
            });

        } else {

            return res.send({
                success: 500,
                message: 'Please check username or password.',
                data: logindata
            })
        }
    });
};

//change password User
exports.changepassword = (req, res) => {

    const {admin_id, password, new_password} = req.body;
    let errors = '';
    console.log("data = " + + JSON.stringify(req.body));
    if (!admin_id) {
        errors = 'Admin id is required.';
    } else if (!password) {
        errors = 'Current password is required.';
    } else if (!new_password) {
        errors = 'New password is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success:500,
            message: errors,
            data: []
        });
    }

    Admin.changepassword(admin_id, password, (err, logindata) => {
        console.log(logindata);

        if (logindata.length > 0) {

            Admin.userchangepasswordupdateById(logindata[0].id, new_password, (err, data) => {
            })

            return res.send({
                success: 200,
                message: 'Change Password successfully!',
                data: logindata
            });

        } else {

            return res.send({
                success: 500,
                message: 'Please check your old password.',
                data: logindata
            })
        }
    });
};

//forget password User
exports.forget_password = (req, res) => {

    const {email} = req.body;
    let errors = '';

    if (!email) {
        errors = 'Email is required.';
    }

    if (errors.length > 0) {

        return res.send({
            error: 500,
            message: errors,
            data: []
        });
    }

    Admin.forgetpassword(email, (err, logindata) => {
        console.log(logindata);

        if (logindata.length > 0) {
            var UserDetails =
                "First Name :-  " + logindata[0].first_name + "\n\n" +
                "Last Name :-   " + logindata[0].last_name + "\n\n" +
                "User Name :-  " + logindata[0].user_name + "\n\n" +
                "Email :-  " + logindata[0].email + "\n\n" +
                "Password :-  " + logindata[0].password + "\n\n" +
                "Date :-  " + logindata[0].created_date;

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'krishi0416@gmail.com', // ethereal user
                    pass: '1612@manu#', // ethereal password
                }
            });

            var mailOptions = {
                from: 'krishi0416@gmail.com',
                to: email,
                subject: "Your Password Details",
                text: UserDetails,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    fs.unlink(path, function (err) {
                        if (err) {
                            return res.end(err)
                        } else {
                            console.log("deleted")
                            return res.redirect("")
                        }
                    })
                }
            });

            return res.send({
                success: 200,
                message: 'Your password is send to your email address.',
                data: []
            });


        } else {

            return res.send({
                error:500,
                message: 'Invalid email address.',
                data: logindata
            })
        }
    });

};

//email check
exports.loginemail = (req, res) => {

    const {email} = req.body;
    let errors = '';

    console.log("data1 = " + + JSON.stringify(req.body));

    if (!email) {
        errors = 'Email is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Admin.loginemail(email, (err, logindata) => {
        console.log("data1 = " + + JSON.stringify(logindata));

        if (logindata.length > 0) {

            return res.send({
                success: 200,
                message: 'Login Successfully! Welcome User ' + logindata[0].user_name,
                data: logindata,
                id:logindata[0].id
            });

        } else {

            return res.send({
                success: 500,
                message: 'Please check your email.',
                data: logindata
            })
        }
    });
};

//single user details
exports.userdetail = (req, res) => {

    const {admin_user_id} = req.body;
    let errors = '';

    console.log(JSON.stringify(req.body));

    if (!admin_user_id) {
        errors = 'User Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success:500,
            message: errors,
            data: []
        });
    }
    Admin.findById(admin_user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${admin_user_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + admin_user_id
                });
            }

        } else {

                res.send({
                    success:200,
                    message: "User Data Display",
                    data: data
                });
        }

    });

};

// Update a User identified by the UserId in the request
exports.userupdate = (req, res) => {
    const {admin_id, first_name, last_name, user_name, email} = req.body;
    let errors = '';
    if (!admin_id) {
        errors = 'User Id is required.';
    } else if (!first_name) {
        errors = 'First Name is required.';
    } else if (!last_name) {
        errors = 'Last Name is required.';
    } else if (!user_name) {
        errors = 'User Name is required.';
    } else if (!email) {
        errors = 'Email is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: 500,
            message: errors,
            data: []
        });
    }

    Admin.userupdateById(admin_id, first_name, last_name, user_name, email, (err, data) => {
        return res.send({
            success: 200,
            message: 'Profile is updated successfully.',
            data: data
        })
    })


};
