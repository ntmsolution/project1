const sql = require("./db.js");

// constructor
const VanueBooking = function(vanuebooking) {
    this.first_name  = vanuebooking.first_name ;
    this.last_name  = vanuebooking.last_name ;
    this.user_id  = vanuebooking.user_id ;
    this.vanue_id  = vanuebooking.vanue_id ;
    this.address  = vanuebooking.address ;
    this.phone  = vanuebooking.phone ;
    this.total_addle  = vanuebooking.total_addle ;
    this.total_child  = vanuebooking.total_child ;
    this.total_price  = vanuebooking.total_price ;
};

VanueBooking.addvanuebooking = (newvanuebooking, result) => {
    sql.query("INSERT INTO vanuebooking SET ?", newvanuebooking, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created VanueBooking: ", { id: res.insertId, ...newvanuebooking });
        result(null, { id: res.insertId, ...newvanuebooking });
    });
};

VanueBooking.alllistlengthvanuebooking = (result) => {
    sql.query("SELECT * FROM vanuebooking", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("VanueBooking: ", res);
        result(null, res);
    });
};

VanueBooking.allvanuebooking = (sp,limit,result) => {
    var strlimit = " LIMIT "+sp+","+limit+"";
    sql.query("SELECT * FROM vanuebooking" + strlimit, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("VanueBooking: ", res);
        result(null, res);
    });
};

VanueBooking.vanuebookingdelete = (id, result) => {
    sql.query("DELETE FROM vanuebooking WHERE id = ?", id, (err, res) => {
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

        console.log("deleted VanueBooking with id: ", id);
        result(null, res);
    });
};

VanueBooking.vupdate = (id, result) => {
    sql.query(`SELECT * FROM vanue WHERE id = ${id}`, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

VanueBooking.vbupdateByvanueId = (id, available_sheet, result) => {
    sql.query("UPDATE vanue SET available_sheet = ? WHERE id = ?", [available_sheet, id], (err, res) => {
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

            console.log("updated available sheet: ", { id: id, ...id, available_sheet });
            result(null, { id: id, ...id, available_sheet });
        }
    );
};



module.exports = VanueBooking;
