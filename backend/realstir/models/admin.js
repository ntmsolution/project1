const sql = require("./db.js");

// constructor
const Admin = function(user) {
  this.user_name = user.user_name;
  this.password = user.password;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.created_date = user.created_date;
};

//login admin
Admin.loginuser = (user_name, password, result) => {
  sql.query("SELECT * FROM admin WHERE user_name = ? AND password = ?",
      [user_name, password],
      (err, res) => {
        result(null, res);
        return;
      });
};

//check email admin
Admin.loginemail = (email, result) => {
    sql.query("SELECT * FROM admin WHERE email = ?",
        [email],
        (err, res) => {
            result(null, res);
            return;
        });
};

//change password
Admin.changepassword = (userId, password, result) => {
  sql.query(`SELECT * FROM admin WHERE id = ? AND password = ?`,
      [userId, password]
      , (err, res) => {
        result(null, res);
        return;
      });
};

Admin.userchangepasswordupdateById = (id, password, result) => {
  sql.query(
      "UPDATE admin SET password = ? WHERE id = ?",
      [password, id],
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

        console.log("updated userdata: ", { id: id, ...id, password });
        result(null, { id: id, ...id, password });
      }
  );
};

//forget password
Admin.forgetpassword = (email, result) => {
  sql.query(`SELECT * FROM admin WHERE email = ?`,
      [email]
      , (err, res) => {
        result(null, res);
        return;
      });
};

// get single user details
Admin.findById = (admin_user_id, result) => {
    sql.query(`SELECT * FROM admin WHERE id = ${admin_user_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

//update user details
Admin.userupdateById = (id, first_name, last_name, user_name, email, result) => {
    sql.query(
        "UPDATE admin SET first_name = ?, last_name = ?, user_name = ?, email = ?  WHERE id = ?",
        [first_name, last_name, user_name, email, id],
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

            console.log("updated Userdata: ", { id: id, ...id, first_name, last_name, user_name, email });
            result(null, { id: id, ...id, first_name, last_name, user_name, email });
        }
    );
};

module.exports = Admin;
