const sql = require("./db.js");

// Constructor
const Order = function (order) {
  (this.product_id = order.product_id),
    (this.shipping_address = order.shipping_address),
    (this.payment_status = order.payment_status),
    (this.quantity_ordered = order.quantity_ordered),
    (this.order_status = order.order_status),
    (this.total = order.total);
};

// Insert
Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET? ", newOrder, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("order added: ", { id: res.name, ...newOrder });
    result(null, { id: res.name, ...newOrder });
  });
};

Order.findById = (orderId, result) => {
  sql.query(`SELECT * FROM orders WHERE _id =   ${orderId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Order: ", res[0]);
      result(null, res[0]);
    }
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (result) => {
  sql.query(`SELECT * FROM orders`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("orders: ", res);
    result(null, res);
  });
};

Order.updateById = (orderId, order, result) => {
  sql.query(
    `UPDATE orders SET product_id=?, shipping_address=?, payment_status=?, quantity_ordered=?, total=?, order_status=?, WHERE _id =? `,
    [
      this.product_id,
      this.shipping_address,
      this.payment_status,
      this.quantity_ordered,
      this.order_status,
      this.total,
      orderId,
    ],
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
      console.log("Updated Order: ");
      result(null, { _id: orderId, ...order });
    }
  );
};

Order.remove = (orderId, result) => {
  sql.query(`DELETE FROM orders WHERE _id =   ${orderId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Order: ");
    result(null, res);
  });
};

Order.removeAll = (result) => {
  sql.query(`TRUNCATE TABLE orders`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

module.exports = Order;
