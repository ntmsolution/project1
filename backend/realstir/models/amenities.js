const sql = require("../../realstir/models/db.js");

// constructor
const Amenities = function(amenities) {

    this.name = amenities.name;
    this.image = amenities.image;
    this.created_date = amenities.created_date;
};

//add
Amenities.addamenities =(newAmenities, result) =>{
    sql.query("INSERT INTO amenities SET ?", newAmenities, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Amenities: ", { id: res.insertId, ...newAmenities });
        result(null, { id: res.insertId, ...newAmenities });
    });
}

//check name
Amenities.findcname = (name, result) => {
    sql.query(`SELECT * FROM amenities WHERE name = ? `,[name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

// get all amenities details
Amenities.getamenities = (result) => {
    sql.query("SELECT * FROM amenities", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("amenities: ", res);
        result(null, res);
    });
};

//multiple amenities delete
Amenities.mamenitiesdelete = (ids, result) => {
    sql.query("DELETE FROM amenities WHERE (id) IN (?) ", [ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} amenities`);
        result(null, res);
    });
};

//single amenities delete
Amenities.samenitiesdelete = (id, result) => {
    sql.query("DELETE FROM amenities WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Amenities with id: ", id);
        result(null, res);
    });
};

// get single details
Amenities.findById = (id, result) => {
    sql.query(`SELECT * FROM amenities WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Amenities: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Amenities with the id
        result({ kind: "not_found" }, null);
    });
};

//edit
Amenities.edit_amenities = (id, name, image, result) => {
    sql.query(
        "UPDATE amenities SET name = ?, image = ? WHERE id = ?",
        [name, image, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Amenities with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated data: ", { id: id, ...id, name, image });
            result(null, { id: id, ...id, name, image });
        }
    );
};

//check name with id
Amenities.CheckName = (name,id, result) => {
    sql.query(`SELECT * FROM amenities WHERE name = ? AND id != ?`,
        [name, id]
        , (err, res) => {
            result(null, res);
            return;
        });
};

module.exports = Amenities;