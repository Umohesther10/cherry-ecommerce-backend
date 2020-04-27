module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");

  // Add a Customer
  app.post("/customers", customer.create);

  //Retrive all Customers
  app.get("/customers", customer.findAll);

  // Retrieve one customer details
  app.get("/customers/:customerId", customer.findOne);

  // Edit Customer
  app.put("/customers/:customerId", customer.update);

  // Delete Customer
  app.delete("/customers/:customerId", customer.delete);

  //Delete All Customers
  app.delete("/customers", customer.deleteAll);
};
