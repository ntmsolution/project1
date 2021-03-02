const Users = require("../models/users_type.js");
const verify_phone = require("../models/verify_phone.js");
const path = require('path');
const Resize = require('../models/Resize');
var springedge = require('springedge');
var otpGenerator = require('otp-generator');
var nodemailer = require('nodemailer');
var fileupload = require('express-fileupload');

// Create and Save a new User
exports.adduser = (req, res) => {
    const {first_name, last_name, user_name, email, password, address, phone_no, city_id, state_id, country_id, gender, hobbies, birthdate, profile_pic, user_type, status, device_type, device_token} = req.body;
    let errors = '';

    console.log(req.body);
    console.log(last_name);

    if (!first_name) {
        errors = 'First Name is required.';
    } else if (!last_name) {
        errors = 'Last Name is required.';
    } else if (!user_name) {
        errors = 'User Name is required.';
    } else if (!email) {
        errors = 'Email is required.';
    } else if (!password) {
        errors = 'Password is required.';
    } else if (!address) {
        errors = 'Address is required.';
    } else if (!phone_no) {
        errors = 'Phone No. is required.';
    } else if (!city_id) {
        errors = 'City Id is required.';
    } else if (!state_id) {
        errors = 'State Id is required.';
    } else if (!country_id) {
        errors = 'Country Id is required.';
    } else if (!gender) {
        errors = 'Gender is required.';
    } else if (!hobbies) {
        errors = 'Hobbies is required.';
    } else if (!birthdate) {
        errors = 'Birthdate is required.';
    } else if (!user_type) {
        errors = 'User Type is required.';
    } else if (!device_token) {
        errors = 'Device Token is required.';
    } else if (!device_type) {
        errors = 'Device Type is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Users.finduname(email, (err, data) => {
        if (data) {
            return res.send({
                success: "no",
                message: "user already exist.",
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

            let profilepic = req.files.profile_pic;

            console.log(profilepic.name);

            var uploadPath = "app/uploads/profile_pictures/" + profilepic.name

            profilepic.mv(uploadPath, function (err) {

                const imagePath = path.join(__dirname, '../uploads/profile_pictures/thumbs');
                console.log(uploadPath);
                const fileUpload1 = new Resize(imagePath);
                const filename = fileUpload1.save(req.files.profile_pic.data, 'thumbimage_' + profilepic.name);
            });


            const user = new Users({
                first_name: first_name,
                last_name: last_name,
                user_name: user_name,
                email: email,
                password: password,
                address: address,
                phone_no: phone_no,
                city_id: city_id,
                state_id: state_id,
                country_id: country_id,
                gender: gender,
                hobbies: hobbies,
                birthdate: birthdate,
                user_type: user_type,
                device_type: device_type,
                device_token: device_token,
                status: status,
                profile_pic: profilepic.name
            });

            console.log(user);

            Users.adduser(user, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                else res.send(
                    {
                        message: "User Added successfully",
                        userdata: data
                    });
            });

        }
    });

}

//Login User
exports.loginuser = (req, res) => {

    const {email, password, user_type, device_type, device_token} = req.body;
    let errors = '';

    if (!email) {
        errors = 'email is required.';
    } else if (!password) {
        errors = 'Password is required.';
    } else if (!user_type) {
        errors = 'User Type is required.';
    } else if (!device_type) {
        errors = 'Device type is required.';
    } else if (!device_token) {
        errors = 'Device token is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }else {

        Users.loginuser(email, password, user_type, (err, logindata) => {
            if (user_type == 0) {
                console.log(logindata);

                console.log(logindata[0].id);

                if (logindata.length > 0) {

                    Users.userloginupdateById(logindata[0].id, device_token, device_type, (err, data) => { })

                    return res.send({
                        success: 'Seller Login successfully! ',
                        message: 'Welcome User ' + logindata[0].user_name,
                        data: logindata
                    });

                } else {

                    return res.send({
                        success: "no",
                        message: 'Please check email or password.',
                        data: logindata
                    })
                }
            } else {
                console.log(logindata);
                console.log(logindata[0].id);

                if (logindata.length > 0) {

                    Users.userloginupdateById(logindata[0].id, device_token, device_type, (err, data) => {
                    })

                    return res.send({
                        success: 'Buyer Login successfully! ',
                        message: 'Welcome User ' + logindata[0].user_name,
                        data: logindata
                    });

                } else {

                    return res.send({
                        success: "no",
                        message: 'Please check email or password.',
                        data: logindata
                    })
                }
            }
        });

    }
};

//change password User
exports.changepassword = (req, res) => {

    const {user_id, current_password, new_password} = req.body;
    let errors = '';

    if (!user_id) {
        errors = 'User id is required.';
    } else if (!current_password) {
        errors = 'Current password is required.';
    } else if (!new_password) {
        errors = 'New password is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Users.changepassword(user_id, current_password, (err, logindata) => {
        console.log(logindata);

        if (logindata.length > 0) {

            Users.userchangepasswordupdateById(logindata[0].id, new_password, (err, data) => {
            })

            return res.send({
                success: 'Change Password successfully! ',
                message: 'Welcome User ' + logindata[0].user_name,
                data: logindata
            });

        } else {

            return res.send({
                success: "no",
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
            success: "no",
            message: errors,
            data: []
        });
    }

    Users.forgetpassword(email, (err, logindata) => {
        console.log(logindata);

        if (logindata.length > 0) {
            var UserDetails =
                "First Name :-  " + logindata[0].first_name + "\n\n" +
                "Last Name :-   " + logindata[0].last_name + "\n\n" +
                "User Name :-  " + logindata[0].user_name + "\n\n" +
                "Email :-  " + logindata[0].email + "\n\n" +
                "Password :-  " + logindata[0].password + "\n\n" +
                "Phone Number :-  " + logindata[0].phone_no + "\n\n" +
                "Status :-  " + logindata[0].status + "\n\n" +
                "User Type :-  " + logindata[0].user_type + "\n\n" +
                "Birthdate :-  " + logindata[0].birthdate + "\n\n" +
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
                success: "yes",
                message: 'Your password is send to your email address.',
                data: []
            });


        } else {

            return res.send({
                success: "no",
                message: 'Invalid email address.',
                data: logindata
            })
        }
    });

};

// Find a All User
exports.alluser = (req, res) => {

    const {user_type} = req.body;
    let errors = '';
    if (!user_type) {
        errors = 'User Type is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Users.alluser(user_type, (err, data) => {
        if (user_type == 0) {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Seller."
                });
            else res.send({
                message: "All Seller Data Display",
                sellerdata: data
            });
        } else {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Buyer."
                });
            else res.send({
                message: "All Buyer Data Display",
                buyerdata: data
            });
        }

    });


}

// Find a single User with a UserId
exports.userdetail = (req, res) => {

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
    Users.findById(user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${user_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + user_id
                });
            }

        } else {

            Users.jointwotabledata(user_id, (err, verify_phone_data) => {
                console.log("data = " + JSON.stringify(verify_phone_data));

                res.send({
                    message: "User Data Display",
                    userdetails: {data, verify_phone_data}
                });
            });
        }

    });

};

// Update a User identified by the UserId in the request
exports.userupdate = (req, res) => {
    const {user_id, first_name, last_name, user_name, email, password, address, phone_no, city_id, state_id, country_id, gender, hobbies, birthdate, profile_pic, user_type, status, device_type, device_token} = req.body;
    let errors = '';
    if (!user_id) {
        errors = 'User Id is required.';
    } else if (!first_name) {
        errors = 'First Name is required.';
    } else if (!last_name) {
        errors = 'Last Name is required.';
    } else if (!user_name) {
        errors = 'User Name is required.';
    } else if (!email) {
        errors = 'Email is required.';
    } else if (!password) {
        errors = 'Password is required.';
    } else if (!address) {
        errors = 'Address is required.';
    } else if (!phone_no) {
        errors = 'Phone No. is required.';
    } else if (!city_id) {
        errors = 'City Id is required.';
    } else if (!state_id) {
        errors = 'State Id is required.';
    } else if (!country_id) {
        errors = 'Country Id is required.';
    } else if (!gender) {
        errors = 'Gender is required.';
    } else if (!hobbies) {
        errors = 'Hobbies is required.';
    } else if (!birthdate) {
        errors = 'Birthdate is required.';
    } else if (!profile_pic) {
        errors = 'Profile Pic is required.';
    } else if (!user_type) {
        errors = 'User Type is required.';
    } else if (!device_token) {
        errors = 'Device Token is required.';
    } else if (!device_type) {
        errors = 'Device Type is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Users.findPhoneExits(phone_no, user_id, (err, data) => {
        if (data) {
            return res.send({
                success: "no",
                message: 'Phone already exist.',
                data: []
            });

        } else {
            Users.CheckEmail(email, user_id, (err, emailData) => {
                if (emailData) {
                    return res.send({
                        success: "no",
                        message: 'Email already exist.',
                        data: []
                    });
                } else {
                    Users.userupdateById(user_id, first_name, last_name, user_name, email, password, phone_no, address, gender, hobbies, birthdate, device_token, device_type, (err, data) => {
                        return res.send({
                            success: "yes",
                            message: 'Profile is updated successfully.',
                            data: data
                        })
                    })
                }
            })
        }
    })

};

// Delete a User with the specified UserId in the request
exports.userdelete = (req, res) => {

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

    Users.userdelete(user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ` + user_id
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + user_id
                });
            }
        } else res.send({
            message: `User was deleted successfully!`,
            data: data
        });
    });
};

// Delete all User from the database.
exports.alluserdelete = (req, res) => {

    const {user_type} = req.body;
    let errors = '';

    if (!user_type) {
        errors = 'User Type is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Users.alluserdelete(user_type, (err, data) => {
        if (user_type == 0) {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all Seller."
                });
            else res.send({
                message: `All Seller deleted successfully!`
            });
        } else {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all Buyer."
                });
            else res.send({
                message: `All Buyer deleted successfully!`
            });
        }

    });

};

exports.userphonenumbervarification = (req, res) => {

    const {user_id, phone_no} = req.body;
    let errors = '';

    if (!user_id) {
        errors = 'User Id is required.';
    } else if (!phone_no) {
        errors = 'Phone Number is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    var otp = otpGenerator.generate(6, {upperCase: false, specialChars: false});

    console.log(otp);

    var params = {
        'sender': 'SEDEMO',
        'apikey': '6jcx935egh57w4r6c58g7i4z4xyiq8j98',
        'to': [phone_no],
        'message': 'Hi,this is a test message for  => ' + otp,
        'format': 'json'
    };

    springedge.messages.send(params, 5000, function (err, response) {
        if (err) {
            return console.log(err);
        }/* else res.send({
            message: `Your otp has been send.`,
            mobile: phone_no,
            otp: otp,
            data: response

        });*/
        console.log(response);
    });

    const vp = new verify_phone({
        user_id: user_id,
        phone_no: phone_no,
        verification_code: otp,
        verified: "0",
        user_type: "0"
    });

    console.log(vp);

    // Save phone in the database
    verify_phone.create(vp, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "no find data."
            });
        else res.send(
            {
                message: "Verify Phone Data Added successfully",
                verify_phone_data: data
            });
    });

};

