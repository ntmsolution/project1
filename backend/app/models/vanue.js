const sql = require("./db.js");

// constructor
const Vanue = function(vanue) {
    this.city_id  = vanue.city_id ;
    this.category_id  = vanue.category_id ;
    this.vanue_name = vanue.vanue_name;
    this.description = vanue.description;
    this.event_date = vanue.event_date;
    this.address = vanue.address;
    this.opening = vanue.opening;
    this.phone = vanue.phone;
    this.popular_facility = vanue.popular_facility;
    this.addle_price = vanue.addle_price;
    this.child_price = vanue.child_price;
    this.total_sheet = vanue.total_sheet;
    this.available_sheet = vanue.available_sheet;
    this.average_ratting = vanue.average_ratting;
};

Vanue.addvanue = (newVanue, result) => {
    sql.query("INSERT INTO vanue SET ?", newVanue, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Vanue: ", { id: res.insertId, ...newVanue });
        result(null, { id: res.insertId, ...newVanue });
    });
};

Vanue.findvname = (vanue_name, result) => {
    sql.query(`SELECT * FROM vanue WHERE vanue_name = ?`,[vanue_name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

Vanue.alllistlengthvanue = (result) => {
    sql.query("SELECT * FROM vanue" , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Vanue: ", res);
        result(null, res);
    });
};

Vanue.allvanue = (sp,limit,result) => {
    var strlimit = " LIMIT "+sp+","+limit+"";
    sql.query("SELECT vanue.*, city.city_name, city.id AS cid, category.category_name, category.id AS catid FROM vanue LEFT OUTER JOIN city ON city.id = vanue.city_id LEFT OUTER JOIN category ON category.id = vanue.category_id" + strlimit , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Vanue: ", res);
        result(null, res);
    });
};

Vanue.vanuedelete = (id, result) => {
    sql.query("DELETE FROM vanue WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Vanue with id: ", id);
        result(null, res);
    });
};

//Vanue  details
Vanue.vanueupdateById = (id, city_id, category_id, vanue_name, description, event_date, address, opening, phone, popular_facility, addle_price, child_price,
                         total_sheet, available_sheet, average_ratting, result) => {
    sql.query(
        "UPDATE vanue SET city_id = ?, category_id = ?, vanue_name = ?, description = ?, event_date = ?, address = ?, opening = ?, phone = ?, popular_facility = ?, addle_price = ?, child_price = ?, total_sheet = ?, available_sheet = ?, average_ratting = ? WHERE id = ?",
        [city_id, category_id, vanue_name, description, event_date, address, opening, phone, popular_facility, addle_price, child_price,
            total_sheet, available_sheet, average_ratting,id],
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

            console.log("updated Vanuedata: ", { id: id, ...id, city_id, category_id, vanue_name, description, event_date, address, opening, phone, popular_facility, addle_price, child_price,
                total_sheet, available_sheet, average_ratting });
            result(null, { id: id, ...id, city_id, category_id, vanue_name, description, event_date, address, opening, phone, popular_facility, addle_price, child_price,
                total_sheet, available_sheet, average_ratting });
        }
    );
};

Vanue.findById = (id, result) => {
    sql.query(`SELECT * FROM vanue WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found vanue: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found vanue with the id
        result({ kind: "not_found" }, null);
    });
};

Vanue.mdata = ( result) => {
    //  sql.query("select *from vanue join mediavanue on mediavanue.vanue_id = vanue.id where mediavanue.id = vanue_id")

    sql.query(`SELECT * FROM mediavanue`, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

Vanue.rdata = (id, result) => {
    sql.query(`SELECT * FROM ratting WHERE vanue_id = ${id}`, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

Vanue.fdata = (id, result) => {
    sql.query(`SELECT * FROM favorite WHERE vanue_id = ${id}`, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

Vanue.mjointwotabledata = (id, result) => {
    sql.query(`SELECT * FROM mediavanue WHERE vanue_id = ${id} `, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

Vanue.rjointwotabledata = (id,uid, result) => {
    sql.query(`SELECT * FROM ratting WHERE vanue_id = ${id} AND user_id = ${uid}`, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

Vanue.fjointwotabledata = (id,uid, result) => {
    sql.query(`SELECT * FROM favorite WHERE vanue_id = ${id} AND user_id = ${uid}`, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};


module.exports = Vanue;
