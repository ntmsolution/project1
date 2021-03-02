const sql = require("./db.js");

// constructor
const City = function(city) {
    this.state_id  = city.state_id ;
    this.country_id  = city.country_id ;
    this.city_name = city.city_name;
};

City.addcity = (newCity, result) => {
    sql.query("INSERT INTO city SET ?", newCity, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created City: ", { id: res.insertId, ...newCity });
        result(null, { id: res.insertId, ...newCity });
    });
};

City.allcity = result => {
    //SELECT city.*, state.state_name, state.id AS sid, country.country_name, country.id AS cid FROM city RIGHT OUTER JOIN state ON city.state_id = state.id RIGHT OUTER JOIN country ON city.country_id = country.id
    sql.query("SELECT * FROM city", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("City: ", res);
        result(null, res);
    });
};

City.citydelete = (id, result) => {
    sql.query("DELETE FROM city WHERE id = ?", id, (err, res) => {
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

        console.log("deleted City with id: ", id);
        result(null, res);
    });
};

module.exports = City;
