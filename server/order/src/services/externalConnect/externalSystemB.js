const axios = require('axios');
const ExternalSystemInterface = require('./externalSystemInterface');
const Order = require('../../services/order/orderModel');
const handleNetworkError = require('./networkErrorHandler');

class ExternalSystemB extends ExternalSystemInterface {
  constructor() {
    super();
    this.systemId = 'systemB';
  }

  async fetchOrders() {
    try {
      // Test를 위해 order 응답 데이터 하드 코딩
      // const response = await axios.get('http://systemB.com/api/orders/fetch', {
      //   headers: {
      //     Authorization: 'Bearer systemB-token',
      //   },
      //   timeout: 5000,
      // });
      // const orders = response.data.orders;
      const orders = [
        {
          id: '2025010801',
          buyer_name: '주문자1',
          purchase_date: '2025-01-08',
          state: '처리 중',
        },
        {
          id: '2025010802',
          buyer_name: '주문자2',
          purchase_date: '2025-01-08',
          state: '배달 중',
        },
        {
          id: '2025010803',
          buyer_name: '주문자3',
          purchase_date: '2025-01-08',
          state: '완료',
        },
      ];

      const convertedOrders = orders
        .filter((order) => this.validateOrder(order))
        .map((order) => this.convert(order));

      return convertedOrders;
    } catch (error) {
      handleNetworkError(this.systemId, error);
    }
  }

  convert(order) {
    return new Order(
      this.systemId,
      order.id,
      order.buyer_name,
      order.purchase_date,
      order.state
    );
  }

  validateOrder(order) {
    // [..생략..]
    return true;
  }
}

let instance = null;

module.exports = {
  getInstance: () => {
    if (!instance) {
      instance = new ExternalSystemB();
    }
    return instance;
  },
};
