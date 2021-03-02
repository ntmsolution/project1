const sql = require("./db.js");

// constructor
const Category = function(category) {
    this.category_name  = category.category_name ;
    this.category_image  = category.category_image ;
};

Category.addcategory = (newcategory, result) => {
    sql.query("INSERT INTO category SET ?", newcategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Category: ", { id: res.insertId, ...newcategory });
        result(null, { id: res.insertId, ...newcategory });
    });
};

Category.findcname = (category_name, result) => {
    sql.query(`SELECT * FROM category WHERE category_name = ? `,[category_name], (err, res) => {
        console.log(res[0]);
        result(null, res[0]);
        return;
    });
};

Category.allcategory = (stext,result) => {

    var sqry = '';
    if(stext !='')
    {
        sqry = " AND category_name LIKE '%"+stext+"%'";
    }

    sql.query(`SELECT * FROM category WHERE 1=1` + sqry, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Category: ", res);
        result(null, res);
    });
};

Category.categorydelete = (id, result) => {
    sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
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


module.exports = Category;
