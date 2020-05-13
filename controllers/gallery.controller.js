const Gallery = require("../models/gallery.models.js");
const cloudinary = require("../config/cloudinary.config.js");


  exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Form cannot be empty",
      });
    }
      const file = req.files.image;
      cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Upload error, try again"
          })
        } else {
            const gallery = new Gallery({
                image: result.url,
                product_id: req.body.product_id
            });
            Gallery.create(gallery, (err, data) => {
              if (err)
                res.status(500).send({
                  message: err.message || "Some error occured while adding your images",
                });
              else res.send(data);
            }); 
        }
    })
};

exports.findOne = (req, res) => {
  Gallery.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found image with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving image with id " + req.params.productId,
        });
      }
    } else res.send(data);
  });
};

