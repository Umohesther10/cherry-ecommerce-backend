const sql = require("./db.js");

// Constructor
const Customer = function (customer) {
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.email = customer.email;
  this.active= customer.active;
};

// Insert
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("created Customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE _id =   ${customerId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Customer: ", res[0]);
      result(null, res[0]);
    }
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = (result) => {
  sql.query(`SELECT * FROM customers`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (customerId, customer, result) => {
  sql.query(
    `UPDATE customers SET first_name=?, last_name=?, email=?, active=? WHERE _id =? `,
    [customer.first_name, customer.last_name, customer.email, customer.active, customerId],
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Customer Records Updated: ");
      result(null, { _id: customerId, ...customer });
    }
  );
};

Customer.remove = (customerId, result) => {
  sql.query(`DELETE FROM customers WHERE _id =   ${customerId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Customer Record Deleted: ");
    result(null, res);
  });
};

Customer.removeAll = (result) => {
  sql.query(`TRUNCATE TABLE customers`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
