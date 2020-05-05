const Order = require("../models/order.model.js");

exports.create = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }

  const order = new Order({
    product_id: req.body.product_id,
    shipping_address: req.body.shipping_address,
    quantity_ordered: req.body.quantity_ordered,
    payment_status: req.body.payment_status,
    order_status: req.body.order_status,
    total: req.body.total,
  });

  Order.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding your orders",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Order.findById(req.params.orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order with id ${req.params.orderId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving order with id " + req.params.orderId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  Order.updateById(req.params.orderId, new Order(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`,
        });
        return;
      } else {
        res.status(500).send({
          message: "Error updating order with id " + req.params.orderId,
        });
        return;
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Order.remove(req.params.orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete order with id " + req.params.orderId,
        });
      }
    } else res.send({ message: `order was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Order.removeAll((err, data) => {
    console.log(data);
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders .",
      });
    } else res.send({ message: `All orders  were deleted successfully` });
  });
};
