const VanueBooking = require("../models/vanuebooking");
const Vanue = require("../models/Vanue");
const moment = require('moment');
const hbs = require('express-handlebars')

exports.addvanuebooking = (req, res) => {

    const {first_name, last_name, user_id, vanue_id, address, phone, total_addle, total_child, total_price} = req.body;
    let errors = '';

    if (!first_name) {
        errors = 'First name is required.';
    } else if (!last_name) {
        errors = 'Last name is required.';
    } else if (!user_id) {
        errors = 'User id is required.';
    } else if (!vanue_id) {
        errors = 'User id is required.';
    } else if (!address) {
        errors = 'Address is required.';
    } else if (!phone) {
        errors = 'Phone is required.';
    } else if (!total_addle) {
        errors = 'Total addle is required.';
    } else if (!total_child) {
        errors = 'Total child is required.';
    } else if (!total_price) {
        errors = 'Total price is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    } else {

        var sum = parseInt(total_addle) + parseInt(total_child);

        console.log(sum);

        VanueBooking.vupdate(vanue_id, (err, vanuedata) => {

            console.log("available_sheet = " + vanuedata[0].available_sheet);

            if (sum <= vanuedata[0].available_sheet) {
                var update = parseInt(vanuedata[0].available_sheet) - parseInt(sum);
                console.log(update);

                console.log("update = " + update);
                const id = vanue_id;
                console.log("id = " + id)

                VanueBooking.vbupdateByvanueId(vanue_id, update, (err, vanuedata) => {
                });

                console.log("update = " + update + " sum = " + sum);

                const vanuebooking = new VanueBooking({
                    first_name: first_name,
                    last_name: last_name,
                    user_id: user_id,
                    vanue_id: vanue_id,
                    address: address,
                    phone: phone,
                    total_addle: total_addle,
                    total_child: total_child,
                    total_price: total_price
                });

                VanueBooking.addvanuebooking(vanuebooking, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the VanueBooking."
                        });
                    else res.send(
                        {
                            message: "VanueBooking Added successfully",
                            vanuebookingdata: data
                        });
                });
            } else {
                return res.send({
                    success: "Yes",
                    message: sum + ' Vanue Sheet Not Available.',
                    data: "Only " + vanuedata.available_sheet + " Sheet are Available."
                })
            }
        });
    }
};

exports.allvanuebooking = (req, res) => {

    var page = req.body.pages

    var pages = parseInt(page);

    var limit = '5';

    if (pages == '') {
        pages = 1;
        sp = 0;
    } else {
        pages = pages;
        sp = (pages - 1) * limit;
    }

    VanueBooking.alllistlengthvanuebooking( (err, data) => {
        console.log(data.length);
        var getcount = data.length;
        var totalpage = Math.ceil(getcount / limit);

        VanueBooking.allvanuebooking(sp, limit, (err, data) => {

            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving VanueBooking."
                });
            else res.send({
                message: "All VanueBooking Data Display",
                vanuebookingdata: {data, current_page: pages, total_page: totalpage}
            });
        });
    });
};

exports.vanuebookingydelete = (req, res) => {

    const {vanuebooking_id} = req.body;
    let errors = '';

    if (!vanuebooking_id) {
        errors = 'VanueBooking Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    VanueBooking.vanuebookingdelete(vanuebooking_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found VanueBooking with id ` + vanuebooking_id
                });
            } else {
                res.status(500).send({
                    message: "Could not VanueBooking with id " + vanuebooking_id
                });
            }
        } else res.send({
            message: `VanueBooking was deleted successfully!`
        });
    });
};


