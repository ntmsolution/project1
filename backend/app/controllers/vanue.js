const Vanue = require("../models/vanue");

exports.addvanue = (req, res) => {

    const {city_id, category_id, vanue_name, description, event_date, address, opening, phone, popular_facility, addle_price, child_price, total_sheet, available_sheet, average_ratting} = req.body;
    let errors = '';

    if (!city_id) {
        errors = 'City id is required.';
    } else if (!category_id) {
        errors = 'Category id is required.';
    } else if (!vanue_name) {
        errors = 'Vanue name is required.';
    } else if (!description) {
        errors = 'Description is required.';
    } else if (!event_date) {
        errors = 'Event date is required.';
    } else if (!address) {
        errors = 'Address is required.';
    } else if (!opening) {
        errors = 'Opening is required.';
    } else if (!phone) {
        errors = 'Phone number is required.';
    } else if (!popular_facility) {
        errors = 'Popular Facility is required.';
    } else if (!addle_price) {
        errors = 'Addle Price is required.';
    } else if (!child_price) {
        errors = 'Child Price is required.';
    } else if (!total_sheet) {
        errors = 'Total sit is required.';
    } else if (!available_sheet) {
        errors = 'Available sit is required.';
    } else if (!average_ratting) {
        errors = 'Average Ratting is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Vanue.findvname(vanue_name, (err, data) => {
        if (data) {
            return res.send({
                success: "no",
                message: "Vanue already exist.",
                data: []
            });
        } else {
            const vanue = new Vanue({
                city_id: city_id,
                category_id: category_id,
                vanue_name: vanue_name,
                description: description,
                event_date: event_date,
                address: address,
                opening: opening,
                phone: phone,
                popular_facility: popular_facility,
                addle_price: addle_price,
                child_price: child_price,
                total_sheet: total_sheet,
                available_sheet: available_sheet,
                average_ratting: average_ratting
            });

            // Save Vanue in the database
            Vanue.addvanue(vanue, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Vanue."
                    });
                else res.send(
                    {
                        message: "Vanue Added successfully",
                        vanuedata: data
                    });
            });
        }
    });


};

exports.allvanue = (req, res) => {

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

    Vanue.alllistlengthvanue((err, data) => {
        console.log(data.length);
        var getcount = data.length;
        var totalpage = Math.ceil(getcount / limit);

        Vanue.allvanue(sp, limit, (err, data1) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Vanue."
                });
            else {
                var vanue_data_detail = [];

                for (let i = 0; i < data1.length; i++) {

                    Vanue.mjointwotabledata(data1[i].id, (err, mediavanue) => {
                        console.log("data = " + JSON.stringify(mediavanue));

                        vanue_data_detail.push({
                            id: data[i].id,
                            city_id: data[i].city_name,
                            category_id: data[i].category_name,
                            vanue_name: data[i].vanue_name,
                            description: data[i].description,
                            event_date: data[i].event_date,
                            address: data[i].address,
                            opening: data[i].opening,
                            phone: data[i].phone,
                            popular_facility: data[i].popular_facility,
                            addle_price: data[i].addle_price,
                            child_price: data[i].child_price,
                            total_sheet: data[i].total_sheet,
                            available_sheet: data[i].available_sheet,
                            average_ratting: data[i].average_ratting,
                            mediavanuedata: mediavanue
                        });

                        console.log("vanue data = " + JSON.stringify(vanue_data_detail));
                    });
                }

                setTimeout(function() {
                    console.log("obj = "+vanue_data_detail.length);
                    return res.send({
                        message: 'All Vanue Data Display',
                        data: {vanue_data_detail, current_page: pages, total_page: totalpage}
                    });
                }, 10000);
            }
        });
    });
};

exports.vanuemediadetail = (req, res) => {

    const {vanue_id, user_id} = req.body;
    let errors = '';

    if (!vanue_id) {
        errors = "Vanue id is required...";
    } else if (!user_id) {
        errors = "User id is required...";
    }
    if (errors.length > 0) {
        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Vanue.findById(vanue_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Vanue with id ${vanue_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Vanue with id " + vanue_id
                });
            }

        } else {

            Vanue.mjointwotabledata(vanue_id, (err, mediavanue) => {
                console.log("data = " + JSON.stringify(mediavanue));

                Vanue.rjointwotabledata(vanue_id, user_id, (err, ratting) => {
                    console.log("data = " + JSON.stringify(ratting));

                    if (ratting == "") {
                        var rat = "0";
                    } else {
                        var rat = "1";
                    }

                    Vanue.fjointwotabledata(vanue_id, user_id, (err, favorite) => {
                        console.log("data = " + JSON.stringify(favorite));

                        if (favorite == "") {
                            var fav = "0";
                        } else {
                            var fav = "1";
                        }

                        res.send({
                            message: "Vanue Data Display",
                            userdetails: {data, is_ratting: rat, is_favorite: fav, mediavanue, ratting, favorite}
                        });
                    });
                });
            });
        }
    });
};

exports.vanueupdate = (req, res) => {

    const {vanue_id, city_id, category_id, vanue_name, description, event_date, address, opening, phone, popular_facility, addle_price, child_price, total_sheet, available_sheet, average_ratting} = req.body;
    let errors = '';

    if (!vanue_id) {
        errors = 'Vanue id is required.';
    } else if (!city_id) {
        errors = 'City id is required.';
    } else if (!category_id) {
        errors = 'Category id is required.';
    } else if (!vanue_name) {
        errors = 'Vanue name is required.';
    } else if (!description) {
        errors = 'Description is required.';
    } else if (!event_date) {
        errors = 'Event date is required.';
    } else if (!address) {
        errors = 'Address is required.';
    } else if (!opening) {
        errors = 'Opening is required.';
    } else if (!phone) {
        errors = 'Phone number is required.';
    } else if (!popular_facility) {
        errors = 'Popular Facility is required.';
    } else if (!addle_price) {
        errors = 'Add Price is required.';
    } else if (!child_price) {
        errors = 'Child Price is required.';
    } else if (!total_sheet) {
        errors = 'Total Sit is required.';
    } else if (!available_sheet) {
        errors = 'Available Sit is required.';
    } else if (!average_ratting) {
        errors = 'Average Ratting is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Vanue.vanueupdateById(vanue_id, city_id, category_id, vanue_name, description, event_date, address, opening, phone, popular_facility, addle_price, child_price,
        total_sheet, available_sheet, average_ratting, (err, data) => {

            console.log(data);
            if (data > 0) {
                return res.send({
                    success: "No",
                    message: 'Vanue Not updated successfully.',
                    vanuedata: data
                })
            } else {
                return res.send({
                    success: "yes",
                    message: 'Vanue is updated successfully.',
                    vanuedata: data
                })
            }
        });
};

exports.vanuedelete = (req, res) => {

    const {vanue_id} = req.body;
    let errors = '';

    if (!vanue_id) {
        errors = 'Vanue id is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Vanue.vanuedelete(vanue_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Vanue with id ` + vanue_id
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Vanue with id " + vanue_id
                });
            }
        } else res.send({
            message: `Vanue was deleted successfully!`,
        });
    });
};
