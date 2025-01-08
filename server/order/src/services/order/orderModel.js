class Order {
  constructor(orderId, customerName, orderDate, status) {
    this.orderId = orderId; // 주문 아이디
    this.customerName = customerName; // 주문자 이름
    this.orderDate = orderDate; // 주문 날짜
    this.status = status; // 주문 상태
  }
}

module.exports = Order;
