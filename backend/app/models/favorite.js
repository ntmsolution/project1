const sql = require("./db.js");

// constructor
const Favorite = function(favorite) {
    this.vanue_id  = favorite.vanue_id ;
    this.user_id  = favorite.user_id ;
};

Favorite.addfavorite = (newfavorite, result) => {
    sql.query("INSERT INTO favorite SET ?", newfavorite, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Favorite: ", { id: res.insertId, ...newfavorite });
        result(null, { id: res.insertId, ...newfavorite });
    });
};

Favorite.allfavorite = result => {
    sql.query("SELECT * FROM favorite", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Favorite: ", res);
        result(null, res);
    });
};

Favorite.favoritedelete = (id, result) => {
    sql.query("DELETE FROM favorite WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Favorite with id: ", id);
        result(null, res);
    });
};

module.exports = Favorite;
