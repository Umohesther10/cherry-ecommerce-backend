const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");

const fileUpload = require("express-fileupload");

require("dotenv").config();

//Parse requset of content type application/json
app.use(bodyParser.json());

app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Parse content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Welcome to our node.js application");
});

require("./routes/product.route.js")(app);
require("./routes/customer.route.js")(app);
require("./routes/order.route.js")(app);

app.listen(5000, () => {
  console.log("Nodejs backend application is running");
});
