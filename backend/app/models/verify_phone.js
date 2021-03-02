const sql = require("./db.js");

// constructor
const Phone = function(verify_phone) {
  this.user_id = verify_phone.user_id;
  this.phone_no = verify_phone.phone_no;
  this.verification_code = verify_phone.verification_code;
  this.verified = verify_phone.verified;
  this.user_type = verify_phone.user_type;
};

/*Phone.findByPhone = (phone,user_type, result) => {
  sql.query(`SELECT * FROM verify_phone WHERE phone = ${phone} AND user_type= ${user_type}`, (err, res) => {
  result(null, res[0]);
  return;  
  });
};

Phone.updateById = (id, otp, result) => {
  sql.query(
    "UPDATE verify_phone SET verified = ?, verification_code = ? WHERE id = ?",
    ['0', otp, id],
    (err, res) => {
      result(null, id);
      return;  
    }
  );
};*/

Phone.create = (newUser, result) => {
  sql.query("INSERT INTO verify_phone SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created verify phone data: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

/*Phone.findPhoneVerify = (phone,user_type,code, result) => {
  sql.query(`SELECT * FROM verify_phone WHERE phone = ${phone} AND user_type= ${user_type} AND verification_code = ${code} AND verified = 0`, (err, res) => {
  result(null, res[0]);
  return;  
  });
};
Phone.findPhone = (phone, result) => {
  sql.query(`SELECT * FROM buyers WHERE phone = ${phone} `, (err, res) => {
  result(null, res[0]);
  return;  
  });
};

Phone.updateByIdUser = (id, device_type,device_token, result) => {
  sql.query(
    "UPDATE buyers SET device_type = ?, device_token = ? WHERE id = ?",
    [device_type, device_token, id],
    (err, res) => {
      result(null, id);
      return;  
    }
  );
};

Phone.remove = (id, result) => {
  sql.query("DELETE FROM verify_phone WHERE id = ?", id, (err, res) => {
    result(null, res);
  });
};*/

module.exports = Phone;
