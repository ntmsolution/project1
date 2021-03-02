
const sql = require("./db.js");

// constructor
const Productimage = function(productimage) {
    this.product_id  = productimage.product_id ;
    this.image  = productimage.image ;
};

Productimage.addproductimage = (newProductimage, result) => {
    sql.query("INSERT INTO productimage SET ?", newProductimage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Productimage: ", { id: res.insertId, ...newProductimage });
        result(null, { id: res.insertId, ...newProductimage });
    });
};

Productimage.allproductimage = result => {
    sql.query("SELECT * FROM productimage", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Productimage: ", res);
        result(null, res);
    });
};

Productimage.productimagedelete = (id, result) => {
    sql.query("DELETE FROM productimage WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Productimage with id: ", id);
        result(null, res);
    });
};

module.exports = Productimage;
