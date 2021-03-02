const MediaVanue = require("../models/mediavanue");
const path = require('path');
const Resize = require('../models/Resize');

exports.addmediavanue = (req, res) => {

    const { vanue_id, media_file, media_type } = req.body;
    let errors = '';

    if (!vanue_id) {
        errors = 'Vanue id is required.';
    }
    else if (!media_type) {
        errors = 'Media Type is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success:"no",
            message: errors,
            data: []
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.send({
            error: "yes",
            message: '',
            data: []
        });
    }

    let mediafile = req.files.media_file;

    var uploadPath = "uploads/vanue_pictures/" + mediafile.name

    mediafile.mv(uploadPath, function (err) {

        const imagePath = path.join(__dirname, '../uploads/vanue_pictures/thumbs');
        console.log(uploadPath);
        const fileUpload1 = new Resize(imagePath);
        const filename = fileUpload1.save(req.files.media_file.data, 'thumbimage_' + mediafile.name);
    });

    const mediavanue = new MediaVanue({
        vanue_id: vanue_id,
        media_file: mediafile.name,
        media_type: media_type
    });

    console.log(mediavanue);
    /* Users.findcityname((err, data) => {
        console.log(data);
     });*/

    // Save Customer in the database
    MediaVanue.addmediavanue(mediavanue, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the MediaVanue."
            });
        else res.send(
            {
                message: "MediaVanue Added successfully",
                mediavanuedata: data
            });
    });

};

exports.allmediavanue = (req, res) => {

    MediaVanue.allmediavanue((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving MediaVanue."
            });
        else res.send({
            message: "All MediaVanue Data Display",
            mediavanuedata: data
        });
    });
};

exports.mediavanuedelete = (req, res) => {

    const {media_vanue_id} = req.body;
    let errors = '';

    if (!media_vanue_id) {
        errors = 'Media Vanue Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    MediaVanue.mediavanuedelete(media_vanue_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Media Vanue with id ` + media_vanue_id
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Media Vanue with id " + media_vanue_id
                });
            }
        } else res.send({
            message: `Media Vanue was deleted successfully!`,
        });
    });
};
