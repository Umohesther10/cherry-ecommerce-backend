const db = require("./db.js");
const sql = require("./db.js");

const Gallery = function (gallery) {
  this.image = gallery.image;
  this.product_id = gallery.product_id;
};

// Add images to product gallery
Gallery.create = (newGallery, result) => {
  let sql = `INSERT INTO gallery SET ?`;
  db.query(sql, newGallery, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { result: res });
  });
};

// Select images using productId
Gallery.findById = (productId, result) => {
  sql.query(
    `SELECT * FROM gallery WHERE product_id =   ${productId}`,
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Images: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Gallery;
