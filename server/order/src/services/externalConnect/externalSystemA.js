const axios = require('axios');
const ExternalSystemInterface = require('./externalSystemInterface');
const Order = require('../../services/order/orderModel');
const handleNetworkError = require('./networkErrorHandler');

class ExternalSystemA extends ExternalSystemInterface {
  constructor() {
    super();
    this.systemId = 'systemA';
  }

  async fetchOrders() {
    try {
      const response = await axios.get('http://systemA.com/api/orders', {
        headers: {
          'x-api-key': 'systemA-key',
        },
        timeout: 5000,
      });

      const orders = response.data;
      const convertedOrders = orders
        .filter((order) => this.validateOrder(order))
        .map((order) => this.convert(order));

      return convertedOrders;
    } catch (error) {
      handleNetworkError(this.systemId, error);
    }
  }

  convert(systemId, order) {
    return new Order(
      this.systemId,
      order.id,
      order.customer,
      order.date,
      order.status
    );
  }

  validateOrder(order) {
    const requiredFields = ['id', 'customerName', 'orderDate', 'status'];

    for (const field of requiredFields) {
      if (!order[field]) {
        console.error(`주문 데이터 오류: 필수 필드 누락 (${field})`);
        return false;
      }
    }

    // 주문 상태 검증 (예: 처리 중, 배송 중, 완료)
    const validStatuses = ['처리 중', '배송 중', '완료'];
    if (!validStatuses.includes(order.status)) {
      console.error(`주문 데이터 오류: 잘못된 주문 상태 (${order.status})`);
      return false;
    }

    // 주문 날짜 형식 검증 (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(order.orderDate)) {
      console.error(`주문 데이터 오류: 잘못된 날짜 형식 (${order.orderDate})`);
      return false;
    }

    return true;
  }
}

let instance = null;

module.exports = {
  getInstance: () => {
    if (!instance) {
      instance = new ExternalSystemA();
    }
    return instance;
  },
};
