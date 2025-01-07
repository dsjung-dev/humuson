class Order {
  constructor(orderId, customerName, orderDate, status) {
    this.orderId = orderId;
    this.customerName = customerName;
    this.orderDate = orderDate;
    this.status = status;
  }
}

module.exports = Order;
