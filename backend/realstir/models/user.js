const sql = require("../../realstir/models/db.js");

// constructor
const User = function(user) {
    this.full_name = user.full_name;
    this.email = user.email;
    this.password = user.password;
    this.profile_picture = user.profile_picture;
    this.phone = user.phone;
    this.device_type = user.device_type;
    this.device_token = user.device_token;
    this.status = user.status;
    this.register_id = user.register_id;
    this.register_type = user.register_type;
    this.user_type = user.user_type;
    this.created_at = user.created_at;
};

// get all user details
User.alluser = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

       // console.log("User: ", res);
        result(null, res);
    });
};

//multiple user delete
User.muserdelete = (ids, result) => {
    sql.query("DELETE FROM users WHERE (id) IN (?) ", [ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} user`);
        result(null, res);
    });
};

//single user delete
User.suserdelete = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

//Approve status change
User.approve_status_update = (id, status, result) => {
    sql.query(
        "UPDATE users SET status = ?  WHERE id = ?",
        [status, id],
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

            console.log("updated Userdata: ", { id: id, ...id, status });
            result(null, { id: id, ...id, status });
        }
    );
};

//multiple user status change
User.muserstatuschange = (ids,status, result) => {
    sql.query("UPDATE users SET status = ?  WHERE (id) IN (?) ", [status, ids], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`updated ${res.affectedRows} user`);
        result(null, res);
    });
};


module.exports = User;