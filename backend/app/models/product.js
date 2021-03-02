const sql = require("./db.js");

// constructor
const Product = function(product) {
    this.category_id  = product.category_id ;
    this.city_id  = product.city_id ;
    this.state_id = product.state_id;
    this.country_id = product.country_id;
    this.product_name = product.product_name;
    this.product_price = product.product_price;
    this.product_description = product.product_description;
    this.product_image = product.product_image;
    this.product_qty = product.product_qty;
};

Product.addproduct = (newProduct, result) => {
    sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Product: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.findproduct = (category_id,product_name, result) => {
    sql.query(`SELECT * FROM product WHERE category_id = ? AND product_name = ?`,[category_id,product_name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

Product.alllistlengthproduct = (result) => {
    //SELECT product.*, city.city_name, category.category_name, state.state_name, country.country_name FROM product RIGHT OUTER JOIN city ON city.id = product.city_id RIGHT OUTER JOIN category ON category.id = product.category_id RIGHT OUTER JOIN state ON state.id = product.state_id RIGHT OUTER JOIN country ON country.id = product.country_id

    sql.query("SELECT * FROM product" , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Product: ", res);
        result(null, res);
    });
};

Product.allproduct = (sp,limit,result) => {
    var strlimit = " LIMIT "+sp+","+limit+"";
    sql.query("SELECT product.*, city.city_name, category.category_name, state.state_name, country.country_name FROM product LEFT OUTER JOIN city ON city.id = product.city_id LEFT OUTER JOIN category ON category.id = product.category_id LEFT OUTER JOIN state ON state.id = product.state_id LEFT OUTER JOIN country ON country.id = product.country_id" + strlimit , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Product: ", res);
        result(null, res);
    });
};

Product.productdelete = (id, result) => {
    sql.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
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

        console.log("deleted Product with id: ", id);
        result(null, res);
    });
};

//Product  details
Product.productupdateById = (id, category_id, city_id, state_id, country_id, product_name, product_price, product_description, product_image, product_qty, result) => {
    sql.query(
        "UPDATE product SET category_id = ?, city_id = ?, state_id = ?, country_id = ?, product_name = ?, product_price = ?, product_description = ?, product_image = ?, product_qty = ? WHERE id = ?",
        [category_id, city_id, state_id, country_id, product_name, product_price, product_description, product_image, product_qty,id],
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

            console.log("updated Productdata: ", { id: id, ...id, category_id, city_id, state_id, country_id, product_name, product_price, product_description, product_image, product_qty });
            result(null, { id: id, ...id, category_id, city_id, state_id, country_id, product_name, product_price, product_description, product_image, product_qty });
        }
    );
};

Product.findById = (id, result) => {
    sql.query(`SELECT * FROM product WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found vanue with the id
        result({ kind: "not_found" }, null);
    });
};

Product.mproduct = (id, result) => {
    sql.query(`SELECT * FROM productimage WHERE product_id = ${id} `, (err, res) => {
        console.log(res);
        result(null, res);
        return;
    });
};

module.exports = Product;
