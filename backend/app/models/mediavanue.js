
const sql = require("./db.js");

// constructor
const MediaVanue = function(mediavanue) {
    this.vanue_id  = mediavanue.vanue_id ;
    this.media_file  = mediavanue.media_file ;
    this.media_type = mediavanue.media_type;
};

MediaVanue.addmediavanue = (newMediaVanue, result) => {
    sql.query("INSERT INTO mediavanue SET ?", newMediaVanue, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created MediaVanue: ", { id: res.insertId, ...newMediaVanue });
        result(null, { id: res.insertId, ...newMediaVanue });
    });
};

MediaVanue.allmediavanue = result => {
    sql.query("SELECT * FROM mediavanue", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("MediaVanue: ", res);
        result(null, res);
    });
};

MediaVanue.mediavanuedelete = (id, result) => {
    sql.query("DELETE FROM mediavanue WHERE id = ?", id, (err, res) => {
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

        console.log("deleted MediaVanue with id: ", id);
        result(null, res);
    });
};

module.exports = MediaVanue;
