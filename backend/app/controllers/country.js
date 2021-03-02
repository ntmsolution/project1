const Country = require("../models/country.js");

// Create and Save a new Country
exports.addcountry = (req, res) => {
    const {country_name, country_short_name, phonecode} = req.body;
    let errors = '';

    if (!country_name) {
        errors = 'Country Name is required.';
    } else if (!country_short_name) {
        errors = 'Country Short Name is required.';
    } else if (!phonecode) {
        errors = 'Phonecode is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    const country = new Country({
        country_name: country_name,
        country_short_name: country_short_name,
        phonecode: phonecode
    });

    // Save Country in the database
    Country.addcountry(country, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Country."
            });
        else res.send(
            {
                message: "Country Added successfully",
                countrydata: data
            });
    });
}

// Find a All Country
exports.allcountry = (req, res) => {

    Country.allcountry((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Country."
            });
        else res.send({
            message: "All Country Data Display",
            countrydata: data
        });
    });

}

// Delete a Country with the specified CountryId in the request
exports.countrydelete = (req, res) => {

    const {country_id} = req.body;
    let errors = '';

    if (!country_id) {
        errors = 'country Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Country.countrydelete(country_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Country with id ` + country_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Country with id " + country_id
                });
            }
        } else res.send({
            message: `Country was deleted successfully!`
        });
    });
};

exports.states = (req, res) => {

    const { country_id} = req.body;
    let errors = '';

    if (!country_id) {
        errors = 'Country is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success:"no",
            message: errors,
            data: []
        });
    }

    Country.states(country_id, (err, data) => {
        if(data)
        {
            return res.send({
                success:"yes",
                message: "",
                data: data
            });
        }
    })

}

exports.cities = (req, res) => {

    const {state_id} = req.body;
    let errors = '';

    if (!state_id) {
        errors = 'state is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success:"no",
            message: errors,
            data: []
        });
    }

    Country.cities(state_id, (err, data) => {
        if(data)
        {
            return res.send({
                success:"yes",
                message: "",
                data: data
            });
        }
    })
}