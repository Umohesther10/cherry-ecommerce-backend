const Customer = require("../models/customer.model.js");

exports.create = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }

  const customer = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.first_name,
    email: req.body.email,
    active: req.body.active,
  });
  // console.log(product);

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding customers",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers record.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving customer with id " + req.params.customerId,
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
  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`,
          });
          return;
        } else {
          res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId,
          });
          return;
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete customer with id " + req.params. customerId,
        });
      }
    } else res.send({ message: `customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    console.log(data);
    if (err) {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while removing all customers .",
        });
    } else res.send({ message: `All customers  were deleted successfully` });
  });
};
