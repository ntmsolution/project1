const sql = require("../../realstir/models/db.js");

// constructor
const Overlooking = function(overlooking) {

    this.name = overlooking.name;
    this.image = overlooking.image;
    this.created_date = overlooking.created_date;
};

//add
Overlooking.addoverlooking =(newOverlooking, result) =>{
    sql.query("INSERT INTO overlooking SET ?", newOverlooking, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Overlooking: ", { id: res.insertId, ...newOverlooking });
        result(null, { id: res.insertId, ...newOverlooking });
    });
}

//check name
Overlooking.findcname = (name, result) => {
    sql.query(`SELECT * FROM overlooking WHERE name = ? `,[name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

// get all overlooking details
Overlooking.getoverlooking = (result) => {
    sql.query("SELECT * FROM overlooking", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("overlooking: ", res);
        result(null, res);
    });
};

//multiple overlooking delete
Overlooking.moverlookingdelete = (ids, result) => {
    sql.query("DELETE FROM overlooking WHERE (id) IN (?) ", [ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} overlooking`);
        result(null, res);
    });
};

//single overlooking delete
Overlooking.soverlookingdelete = (id, result) => {
    sql.query("DELETE FROM overlooking WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Overlooking with id: ", id);
        result(null, res);
    });
};

// get single details
Overlooking.findById = (id, result) => {
    sql.query(`SELECT * FROM overlooking WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Overlooking: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Overlooking with the id
        result({ kind: "not_found" }, null);
    });
};

//edit
Overlooking.edit_overlooking = (id, name, image, result) => {
    sql.query(
        "UPDATE overlooking SET name = ?, image = ? WHERE id = ?",
        [name, image, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Overlooking with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated data: ", { id: id, ...id, name, image });
            result(null, { id: id, ...id, name, image });
        }
    );
};

//check name with id
Overlooking.CheckName = (name,id, result) => {
    sql.query(`SELECT * FROM overlooking WHERE name = ? AND id != ?`,
        [name, id]
        , (err, res) => {
            result(null, res);
            return;
        });
};

module.exports = Overlooking;