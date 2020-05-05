module.exports = (app) => {
    const order = require("../controllers/order.controller.js");
   
    // Add an order
    app.post("/orders", order.create);
  
    //Retrive all orders
    app.get("/orders", order.findAll);
  
    // Retrieve one order
    app.get("/orders/:orderId", order.findOne);
  
    // Edit an order
    app.put("/orders/:orderId", order.update);
  
    // Delete an order
    app.delete("/orders/:orderId", order.delete);
  
    //Delete all orders
    app.delete("/orders", order.deleteAll);
  
   
  };
  
  