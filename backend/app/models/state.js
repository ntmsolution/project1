const sql = require("./db.js");

// constructor
const State = function(state) {
    this.country_id  = state.country_id ;
    this.state_name = state.state_name;
};

State.addstate = (newState, result) => {
    sql.query("INSERT INTO state SET ?", newState, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created State: ", { id: res.insertId, ...newState });
        result(null, { id: res.insertId, ...newState });
    });
};

State.allstate = result => {
    sql.query("SELECT * FROM state", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("State: ", res);
        result(null, res);
    });
};

State.statedelete = (id, result) => {
    sql.query("DELETE FROM state WHERE id = ?", id, (err, res) => {
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

        console.log("deleted State with id: ", id);
        result(null, res);
    });
};

module.exports = State;
