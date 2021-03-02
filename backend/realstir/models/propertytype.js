const sql = require("../../realstir/models/db.js");

// constructor
const Propertytype = function(propertytype) {

    this.name = propertytype.name;
    this.image = propertytype.image;
    this.created_date = propertytype.created_date;
};

//add
Propertytype.addpropertytype =(newPropertytype, result) =>{
    sql.query("INSERT INTO property_types SET ?", newPropertytype, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Propertytype: ", { id: res.insertId, ...newPropertytype });
        result(null, { id: res.insertId, ...newPropertytype });
    });
}

//check name
Propertytype.findcname = (name, result) => {
    sql.query(`SELECT * FROM property_types WHERE name = ? `,[name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

// get all propertytype details
Propertytype.getpropertytype = (result) => {
    sql.query("SELECT * FROM property_types", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("propertytype: ", res);
        result(null, res);
    });
};

//multiple propertytype delete
Propertytype.mpropertytypedelete = (ids, result) => {
    sql.query("DELETE FROM property_types WHERE (id) IN (?) ", [ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} propertytype`);
        result(null, res);
    });
};

//single propertytype delete
Propertytype.spropertytypedelete = (id, result) => {
    sql.query("DELETE FROM property_types WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Propertytype with id: ", id);
        result(null, res);
    });
};

// get single details
Propertytype.findById = (id, result) => {
    sql.query(`SELECT * FROM property_types WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Propertytype: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Propertytype with the id
        result({ kind: "not_found" }, null);
    });
};

//edit
Propertytype.edit_propertytypes = (id, name, image, result) => {
    sql.query(
        "UPDATE property_types SET name = ?, image = ? WHERE id = ?",
        [name, image, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Propertytype with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated data: ", { id: id, ...id, name, image });
            result(null, { id: id, ...id, name, image });
        }
    );
};

//check name with id
Propertytype.CheckName = (name,id, result) => {
    sql.query(`SELECT * FROM property_types WHERE name = ? OR id != ?`,
        [name, id]
        , (err, res) => {
            result(null, res);
            return;
        });
};

module.exports = Propertytype;