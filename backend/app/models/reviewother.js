const sql = require("./db.js");

// constructor
const Reviewother = function(reviewother) {
    this.fav_id  = reviewother.fav_id ;
    this.review = reviewother.review;
};

Reviewother.addreview = (newReviewother, result) => {
    sql.query("INSERT INTO Reviewother SET ?", newReviewother, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Reviewother: ", { id: res.insertId, ...newReviewother });
        result(null, { id: res.insertId, ...newReviewother });
    });
};
module.exports = Reviewother;