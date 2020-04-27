const db = require("./db.js");

const Gallery = function (gallery) {
    this.image = gallery.image;
    this.product_id = gallery.product_id;
  };

// Add images to product gallery
Gallery.create = (newGallery, result) => {
    let sql = `INSERT INTO gallery SET ?`
    db.query(sql, newGallery, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { result: res });
    });
  };
  
module.exports =  Gallery