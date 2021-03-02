const Favorite = require("../models/Favorite");
const Reviewother = require("../models/Reviewother");

exports.addfavorite = (req, res) => {

    const {user_id, vanue_id,reviewother} = req.body;
    let errors = '';

    if (!user_id) {
        errors = 'User id is required.';
    } else if (!vanue_id) {
        errors = 'Vanue id is required.';
    }else if (!reviewother) {
        errors = 'Reviewother is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    const favorite = new Favorite({
        user_id: user_id,
        vanue_id: vanue_id
    });

    // Save City in the database
    Favorite.addfavorite(favorite, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Favorite."
            });
        else {
            res.send(
                {
                    message: "Favorite Added successfully",
                    favoritedata: data
                });

            var data = JSON.stringify(reviewother);
            var pdata = JSON.parse(data);
            var podata = JSON.parse(reviewother);
            console.log(data);
            console.log(podata);
            console.log(pdata);

            for (i = 0; i < podata.length; i++) {

                // console.log(podata[i].user_id);

                var favid = podata[i].fav_id;
                otheruserdatadetails = new Reviewother({
                    fav_id: favid,
                    review: podata[i].review
                });

                Reviewother.addreview(otheruserdatadetails, (err, data) => {

                });
                console.log("data = " + otheruserdatadetails);
            }

        }
    });


};

exports.allfavorite = (req, res) => {

    Favorite.allfavorite((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Favorite."
            });
        else res.send({
            message: "All Favorite Data Display",
            favoritedata:data
        });
    });

};

exports.favoritedelete = (req, res) => {

    const {favorite_id} = req.body;
    let errors = '';

    if (!favorite_id) {
        errors = 'Favorite Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Favorite.favoritedelete(favorite_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Favorite with id ` + favorite_id
                });
            } else {
                res.status(500).send({
                    message: "Could not Favorite User with id " + favorite_id
                });
            }
        } else res.send({
            message: `Favorite was deleted successfully!`
        });
    });
};

