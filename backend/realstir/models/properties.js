const sql = require("../../realstir/models/db.js");

// constructor
const Properties = function(properties) {

    this.property_type_id = properties.property_type_id;
    this.property_sub_type	 = properties.property_sub_type	;
    this.property_name = properties.property_name;
    this.address = properties.address;
    this.amount = properties.amount;
    this.saleable_area = properties.saleable_area;
    this.property_owner_name = properties.property_owner_name;
    this.added_date = properties.added_date;
    this.status = properties.status;
    this.is_verified = properties.is_verified;

};

//add
Properties.addproperties =(newProperties, result) =>{
    sql.query("INSERT INTO propertys SET ?", newProperties, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Properties: ", { id: res.insertId, ...newProperties });
        result(null, { id: res.insertId, ...newProperties });
    });
}

//check name
Properties.findcname = (name, result) => {
    sql.query(`SELECT * FROM propertys WHERE name = ? `,[name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

// get all properties details
Properties.getproperties = (result) => {
    sql.query("SELECT * FROM propertys", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("properties: ", res);
        result(null, res);
    });
};

//multiple properties delete
Properties.mpropertiesdelete = (ids, result) => {
    sql.query("DELETE FROM propertys WHERE (id) IN (?) ", [ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} properties`);
        result(null, res);
    });
};

//single properties delete
Properties.spropertiesdelete = (id, result) => {
    sql.query("DELETE FROM propertys WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Properties with id: ", id);
        result(null, res);
    });
};

// get single details
Properties.findById = (id, result) => {
    sql.query(`SELECT * FROM propertys WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Properties: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Properties with the id
        result({ kind: "not_found" }, null);
    });
};

//edit
Properties.edit_properties = (id, name, image, result) => {
    sql.query(
        "UPDATE propertys SET name = ?, image = ? WHERE id = ?",
        [name, image, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Properties with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated data: ", { id: id, ...id, name, image });
            result(null, { id: id, ...id, name, image });
        }
    );
};

//check name with id
Properties.CheckName = (name,id, result) => {
    sql.query(`SELECT * FROM propertys WHERE name = ? OR id != ?`,
        [name, id]
        , (err, res) => {
            result(null, res);
            return;
        });
};

//Approve status change
Properties.verify_status_update = (id, is_verified, result) => {
    sql.query(
        "UPDATE propertys SET is_verified = ?  WHERE id = ?",
        [is_verified, id],
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

            console.log("updated Userdata: ", { id: id, ...id, is_verified });
            result(null, { id: id, ...id, is_verified });
        }
    );
};

//multiple user status change
Properties.mverifystatuschange = (ids,is_verified, result) => {
    sql.query("UPDATE propertys SET is_verified = ?  WHERE (id) IN (?) ", [is_verified, ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`updated ${res.affectedRows} user`);
        result(null, res);
    });
};

module.exports = Properties;