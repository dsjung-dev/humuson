const axios = require('axios');
const ExternalSystemInterface = require('./externalSystemInterface');
const Order = require('../../services/order/orderModel');
const handleNetworkError = require('./networkErrorHandler');

class ExternalSystemB extends ExternalSystemInterface {
  async fetchOrders() {
    try {
      const response = await axios.get('http://systemB.com/api/orders/fetch', {
        headers: {
          Authorization: 'Bearer systemB-token',
        },
        timeout: 5000,
      });

      const orders = response.data.orders;
      const convertedOrders = orders
        .filter((order) => this.validateOrder(order))
        .map((order) => this.convert(order));

      return convertedOrders;
    } catch (error) {
      handleNetworkError('SystemB', error);
    }
  }

  convert(order) {
    return new Order(
      order.id,
      order.buyer_name,
      order.purchase_date,
      order.state
    );
  }

  validateOrder(order) {
    // ..생략
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
