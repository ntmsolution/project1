const City = require("../models/city.js");

// Create and Save a new City
exports.addcity = (req, res) => {
    const {state_id, country_id, city_name} = req.body;
    let errors = '';
    if (!state_id) {
        errors = 'State Id is required.';
    } else if (!country_id) {
        errors = 'Country Id is required.';
    } else if (!city_name) {
        errors = 'City Name is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    const city = new City({
        state_id: state_id,
        country_id: country_id,
        city_name: city_name,
    });

    // Save City in the database
    City.addcity(city, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the City."
            });
        else res.send(
            {
                message: "City Added successfully",
                citydata: data
            });
    });
}

// Find a All City
exports.allcity = (req, res) => {

    City.allcity((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving City."
            });
        else res.send({
            message: "All City Data Display",
            citydata: data
        });
    });

}

// Delete a City with the specified CityId in the request
exports.citydelete = (req, res) => {

    const {city_id} = req.body;
    let errors = '';

    if (!city_id) {
        errors = 'City Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    City.citydelete(city_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found City with id ` + city_id
                });
            } else {
                res.status(500).send({
                    message: "Could not City User with id " + city_id
                });
            }
        } else res.send({
            message: `City was deleted successfully!`
        });
    });
};
