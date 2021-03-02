
const sql = require("./db.js");

// constructor
const Cart = function(cart) {
    this.user_id  = cart.user_id ;
    this.product_id  = cart.product_id ;
    this.product_price = cart.product_price;
    this.product_qty = cart.product_qty;
    this.product_total = cart.product_total;
};

Cart.addcart = (newCart, result) => {
    sql.query("INSERT INTO cart SET ?", newCart, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Cart: ", { id: res.insertId, ...newCart });
        result(null, { id: res.insertId, ...newCart });
    });
};

Cart.cartupdateBycartId = (id, user_id, product_id, product_qty, product_total, result) => {
    sql.query("UPDATE cart SET user_id = ?, product_id = ?, product_qty = ?, product_total = ? WHERE id = ?", [user_id,product_id,product_qty,product_total, id], (err, res) => {
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

            console.log("updated Product QTY: ", { id: id, ...id, product_qty,product_total });
            result(null, { id: id, ...id, product_qty,product_total });
        }
    );
};

Cart.allcartqty = (user_id, product_id,result) => {
    sql.query("SELECT product_qty,id FROM cart WHERE user_id = ? AND product_id = ?",[user_id, product_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Cart: ", res);
        result(null, res);
    });
};

Cart.allcart = result => {
    sql.query("SELECT * FROM cart", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Cart: ", res);
        result(null, res);
    });
};

Cart.allcartpage = (sp,limit,result) => {
    var strlimit = " LIMIT "+sp+","+limit+"";
    sql.query("SELECT * FROM cart" + strlimit , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Vanue: ", res);
        result(null, res);
    });
};

Cart.cartupdateById = (id, user_id, product_id, product_qty, product_total, result) => {
    sql.query(
        "UPDATE cart SET user_id = ?, product_id = ?, product_qty = ?, product_total = ? WHERE id = ?",
        [user_id, product_id, product_qty, product_total, id],
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

            console.log("updated Cartdata: ", { id: id, ...id, product_id, product_qty });
            result(null, { id: id, ...id, product_id, product_qty });
        }
    );
};

Cart.cartdelete = (id, result) => {
    sql.query("DELETE FROM cart WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Cart with id: ", id);
        result(null, res);
    });
};

module.exports = Cart;
