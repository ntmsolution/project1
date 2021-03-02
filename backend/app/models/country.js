const sql = require("./db.js");

// constructor
const Country = function(country) {
    this.country_name  = country.country_name ;
    this.country_short_name = country.country_short_name;
    this.phonecode = country.phonecode;
};

Country.addcountry = (newCountry, result) => {
    sql.query("INSERT INTO country SET ?", newCountry, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Country: ", { id: res.insertId, ...newCountry });
        result(null, { id: res.insertId, ...newCountry });
    });
};

Country.allcountry = result => {
    sql.query("SELECT * FROM country", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Country: ", res);
        result(null, res);
    });
};

Country.countrydelete = (id, result) => {
    sql.query("DELETE FROM country WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Country with id: ", id);
        result(null, res);
    });
};

Country.states = (id, result) => {
    sql.query(`SELECT * FROM state WHERE country_id = ${id}`, (err, res) => {
        result(null, res);
        return;
    });
};

Country.cities = (state_id, result) => {
    sql.query(`SELECT * FROM city WHERE state_id = ${state_id}`, (err, res) => {
        result(null, res);
        return;
    });
};

module.exports = Country;
