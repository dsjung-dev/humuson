const ORDER_STATUS = {
  PROCESSING: 'PROCESSING', // 처리중
  ON_DELIVERY: 'ON_DELIVERY', // 배달중
  COMPLETED: 'COMPLETED', // 완료
};

class Order {
  constructor(externalSystemId, orderId, customerName, orderDate, status) {
    this.externalSystemId = externalSystemId | undefined; // 외부시스템 ID
    this.orderId = orderId; // 주문 아이디
    this.customerName = customerName; // 주문자 이름
    this.orderDate = orderDate; // 주문 날짜
    this.status = status; // 주문 상태
  }
}

module.exports = { Order, ORDER_STATUS };
