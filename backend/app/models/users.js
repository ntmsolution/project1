const sql = require("./db.js");

// constructor
const Users = function(user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.user_name = user.user_name;
  this.email = user.email;
  this.password = user.password;
  this.address = user.address;
  this.phone_no = user.phone_no;
  this.city_id  = user.city_id ;
  this.state_id  = user.state_id ;
  this.country_id = user.country_id;
  this.gender = user.gender;
  this.hobbies = user.hobbies;
  this.birthdate = user.birthdate;
  this.device_token = user.device_token;
  this.device_type = user.device_type;
  this.user_type = user.user_type;
  this.status = user.status;
  this.profile_pic = user.profile_pic;
  this.created_date = user.created_date;
};

// add user
Users.adduser = (newUser, result) => {

    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });

};

Users.finduname = (email, result) => {
    sql.query(`SELECT * FROM user WHERE email = ? `,[email], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

Users.findcityname = ( result) => {

    sql.query("select user.*, state.state_name, state.id as sid from user right outer join state on user.state_id = state.id", (err, res) => {
        if (err) {
            console.log("error: ", err);
            console.log("res: ", sql);
            result(err, null);
            return;
        }
    });

};

Users.loginuser = (user_name,password, result) => {
  sql.query(`SELECT * FROM user WHERE user_name = ? AND password = ?`,
      [user_name, password],
      (err, res) => {
        result(null, res);
        return;
      });
};

Users.userloginupdateById = (id, device_token, device_type, result) => {
  sql.query(
      "UPDATE user SET device_token = ?, device_type = ? WHERE id = ?",
      [device_token, device_type, id],
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

        console.log("updated userdata: ", { id: id, ...id, device_token, device_type });
        result(null, { id: id, ...id, device_token, device_type });
      }
  );
};


//change password
Users.changepassword = (userId,password, result) => {
  sql.query(`SELECT * FROM user WHERE id = ? AND password = ?`,
      [userId, password]
      , (err, res) => {
        result(null, res);
        return;
      });
};

Users.userchangepasswordupdateById = (id, password, result) => {
  sql.query(
      "UPDATE user SET password = ? WHERE id = ?",
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
Users.forgetpassword = (email, result) => {
  sql.query(`SELECT * FROM user WHERE email = ?`,
      [email]
      , (err, res) => {
        result(null, res);
        return;
      });
};

// get all user details
Users.alluser = (result) => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};


// get single user details
Users.findById = (userId, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
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

Users.jointwotabledata = (userId, result) => {
    sql.query(`SELECT * FROM verify_phone WHERE user_id = ${userId}`, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

//update user details
Users.userupdateById = (id, first_name, last_name, user_name, email, password, phone_no, address, gender, hobbies, birthdate, device_token, device_type, result) => {
  sql.query(
      "UPDATE user SET first_name = ?, last_name = ?, user_name = ?, email = ?, password = ?, phone_no = ?, address = ?, gender = ?, hobbies = ?, birthdate = ?, device_token = ?, device_type = ? WHERE id = ?",
      [first_name, last_name, user_name, email, password, phone_no, address, gender, hobbies, birthdate, device_token, device_type, id],
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

        console.log("updated Userdata: ", { id: id, ...id, first_name, last_name, user_name, email, password, phone_no, address, gender, hobbies, birthdate, device_token, device_type });
        result(null, { id: id, ...id, first_name, last_name, user_name, email, password, phone_no, address, gender, hobbies, birthdate, device_token, device_type });
      }
  );
};

Users.findPhoneExits = (phone_no,userId, result) => {
  sql.query(`SELECT * FROM user WHERE phone = ? AND id != ?`,
      [phone_no, userId]
      , (err, res) => {
        result(null, res);
        return;
      });
};

Users.CheckEmail = (email,userId, result) => {
  sql.query(`SELECT * FROM user WHERE email = ? AND id != ?`,
      [email, userId]
      , (err, res) => {
        result(null, res);
        return;
      });
};


// single user delete
Users.userdelete = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};


//all user delete to database
Users.alluserdelete = result => {
  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};


module.exports = Users;
