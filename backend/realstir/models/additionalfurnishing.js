const sql = require("../../realstir/models/db.js");

// constructor
const additionalfurnishing = function(additional_furnishing) {

    this.name = additional_furnishing.name;
    this.image = additional_furnishing.image;
    this.created_date = additional_furnishing.created_date;
};

//add
additionalfurnishing.addadditionalfurnishing =(newadditionalfurnishing, result) =>{
    sql.query("INSERT INTO additional_furnishing SET ?", newadditionalfurnishing, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created additionalfurnishing: ", { id: res.insertId, ...newadditionalfurnishing });
        result(null, { id: res.insertId, ...newadditionalfurnishing });
    });
}

//check name
additionalfurnishing.findcname = (name, result) => {
    sql.query(`SELECT * FROM additional_furnishing WHERE name = ? `,[name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

// get all additional_furnishing details
additionalfurnishing.getadditionalfurnishinga = (result) => {
    sql.query("SELECT * FROM additional_furnishing", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("additionalfurnishing: ", res);
        result(null, res);
    });
};

//multiple additional_furnishing delete
additionalfurnishing.madditional_furnishingdelete = (ids, result) => {
    sql.query("DELETE FROM additional_furnishing WHERE (id) IN (?) ", [ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} additional_furnishing`);
        result(null, res);
    });
};

//single additional_furnishing delete
additionalfurnishing.sadditional_furnishingdelete = (id, result) => {
    sql.query("DELETE FROM additional_furnishing WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Category with id: ", id);
        result(null, res);
    });
};

// get single details
additionalfurnishing.findById = (id, result) => {
    sql.query(`SELECT * FROM additional_furnishing WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found additionalfurnishing: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found additionalfurnishing with the id
        result({ kind: "not_found" }, null);
    });
};

//edit
additionalfurnishing.edit_additionalfurnishing = (id, name, image, result) => {
    sql.query(
        "UPDATE additional_furnishing SET name = ?, image = ? WHERE id = ?",
        [name, image, id],
        (err, res) => {
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

            console.log("updated data: ", { id: id, ...id, name, image });
            result(null, { id: id, ...id, name, image });
        }
    );
};

//check name with id
additionalfurnishing.CheckName = (name,id, result) => {
    sql.query(`SELECT * FROM additional_furnishing WHERE name = ? AND id != ?`,
        [name, id]
        , (err, res) => {
            result(null, res);
            return;
        });
};

module.exports = additionalfurnishing;