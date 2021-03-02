const State = require("../models/state.js");

// Create and Save a new State
exports.addstate = (req, res) => {
    const {country_id, state_name} = req.body;
    let errors = '';

    if (!country_id) {
        errors = 'Country Id is required.';
    } else if (!state_name) {
        errors = 'State Name is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    const state = new State({
        country_id: country_id,
        state_name: state_name,
    });

    // Save State in the database
    State.addstate(state, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the State."
            });
        else res.send(
            {
                message: "State Added successfully",
                statedata: data
            });
    });
}

// Find a All State
exports.allstate = (req, res) => {

    State.allstate((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving State."
            });
        else res.send({
            message: "All state Data Display",
            statedata: data
        });
    });

}

// Delete a State with the specified StateId in the request
exports.statedelete = (req, res) => {

    const {state_id} = req.body;
    let errors = '';

    if (!state_id) {
        errors = 'State Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    State.statedelete(state_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found state with id ` + state_id
                });
            } else {
                res.status(500).send({
                    message: "Could not state with id " + state_id
                });
            }
        } else res.send({
            message: `State was deleted successfully!`
        });
    });
};
