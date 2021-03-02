const sql = require("./db.js");

// constructor
const Ratting = function(ratting) {
    this.user_id  = ratting.user_id ;
    this.vanue_id  = ratting.vanue_id ;
    this.review = ratting.review;
    this.ratting = ratting.ratting;
};

Ratting.addratting = (newRatting, result) => {
    sql.query("INSERT INTO ratting SET ?", newRatting, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Ratting: ", { id: res.insertId, ...newRatting });
        result(null, { id: res.insertId, ...newRatting });
    });
};

Ratting.findrname = (user_id,vanue_id, result) => {
    sql.query(`SELECT * FROM ratting WHERE user_id = ${user_id} AND vanue_id = ${vanue_id}`, (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

Ratting.allratting = result => {
    sql.query("SELECT * FROM ratting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Ratting: ", res);
        result(null, res);
    });
};

Ratting.getvid = (id, result) => {
    sql.query(`SELECT * FROM vanue WHERE id = ${id}`, (err, res) => {
        result(null, res);
        return;
    });
};

Ratting.getrid = (id, result) => {
    sql.query(`SELECT * FROM ratting WHERE vanue_id = ${id}`, (err, res) => {
        result(null, res);
        return;
    });
};

Ratting.rupdateByvanueId = (id, avg_ratting, result) => {
    sql.query("UPDATE vanue SET average_ratting = ? WHERE id = ?", [avg_ratting, id], (err, res) => {
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

            console.log("updated ratting: ", { id: id, ...id, avg_ratting });
            result(null, { id: id, ...id, avg_ratting });
        }
    );
};

module.exports = Ratting;
