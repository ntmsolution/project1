const sql = require("../../realstir/models/db.js");

// constructor
const Additionalrooms = function(additionalrooms) {

    this.name = additionalrooms.name;
    this.image = additionalrooms.image;
    this.created_date = additionalrooms.created_date;
};

//add
Additionalrooms.addadditionalrooms =(newAdditionalrooms, result) =>{
    sql.query("INSERT INTO additional_rooms SET ?", newAdditionalrooms, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Additionalrooms: ", { id: res.insertId, ...newAdditionalrooms });
        result(null, { id: res.insertId, ...newAdditionalrooms });
    });
}

//check name
Additionalrooms.findcname = (name, result) => {
    sql.query(`SELECT * FROM additional_rooms WHERE name = ? `,[name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

// get all additionalrooms details
Additionalrooms.getadditionalrooms = (result) => {
    sql.query("SELECT * FROM additional_rooms", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("additionalrooms: ", res);
        result(null, res);
    });
};

//multiple additionalrooms delete
Additionalrooms.madditionalroomsdelete = (ids, result) => {
    sql.query("DELETE FROM additional_rooms WHERE (id) IN (?) ", [ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} additionalrooms`);
        result(null, res);
    });
};

//single additionalrooms delete
Additionalrooms.sadditionalroomsdelete = (id, result) => {
    sql.query("DELETE FROM additional_rooms WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Additionalrooms with id: ", id);
        result(null, res);
    });
};

// get single details
Additionalrooms.findById = (id, result) => {
    sql.query(`SELECT * FROM additional_rooms WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Additionalrooms: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Additionalrooms with the id
        result({ kind: "not_found" }, null);
    });
};

//edit
Additionalrooms.edit_additionalrooms = (id, name, image, result) => {
    sql.query(
        "UPDATE additional_rooms SET name = ?, image = ? WHERE id = ?",
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
Additionalrooms.CheckName = (name,id, result) => {
    sql.query(`SELECT * FROM additional_rooms WHERE name = ? AND id != ?`,
        [name, id]
        , (err, res) => {
            result(null, res);
            return;
        });
};

module.exports = Additionalrooms;