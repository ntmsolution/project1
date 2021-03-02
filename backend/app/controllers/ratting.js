const Ratting = require("../models/ratting");
const Vanue = require("../models/vanue");

exports.addratting = (req, res) => {

    const {user_id, vanue_id, review, ratting} = req.body;
    let errors = '';

    if (!user_id) {
        errors = 'User id is required.';
    } else if (!vanue_id) {
        errors = 'Vanue id is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Ratting.findrname(user_id,vanue_id,(err, data) =>{
        if (data) {
            return res.send({
                success: "no",
                message: "user already exist.",
                data: []
            });
        } else {
            const rattingdata = new Ratting({
                user_id: user_id,
                vanue_id: vanue_id,
                review: review,
                ratting: ratting
            });

            Ratting.addratting(rattingdata, (err, rattingdata) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Ratting."
                    });
                else res.send(
                    {
                        message: "Ratting Added successfully",
                        rattingdata: rattingdata
                    });

                Ratting.getvid(vanue_id, (err, vanuedata) => {
                    Ratting.getrid(vanue_id, (err, rattingdata) => {
                        console.log("v = " + vanuedata[0].average_ratting);
                        console.log("r = " + rattingdata.length);

                        var update = parseInt(vanuedata[0].average_ratting) + parseFloat(ratting);
                        console.log(update);
                        var updatedata = update / rattingdata.length;
                        var uformatdata = parseFloat(updatedata).toFixed(1);

                        /* console.log("updatedetails = "+updatedata);
                         console.log("updatedetails = "+parseFloat(updatedata).toFixed(1));*/

                        Ratting.rupdateByvanueId(vanue_id, uformatdata, (err, datavr) => {
                            console.log(datavr);
                        })

                    });
                });
            });
        }
    });

};

exports.allratting = (req, res) => {

    Ratting.allratting((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Ratting."
            });
        else res.send({
            message: "All Ratting Data Display",
            rattingdata: data
        });
    });
};

