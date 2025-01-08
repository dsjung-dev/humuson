const axios = require('axios');
const Ajv = require('ajv');
const ExternalSystemInterface = require('./externalSystemInterface');
const { Order, ORDER_STATUS } = require('../../services/order/orderModel');
const handleNetworkError = require('./networkErrorHandler');

// 주문 데이터 스키마
const orderSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', minLength: 1, maxLength: 10 },
    customerName: { type: 'string', minLength: 1, maxLength: 20 },
    orderDate: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      errorMessage: {
        pattern: '주문 날짜 형식은 YYYY-MM-DD 이어야 합니다.',
      },
    },
    status: {
      type: 'string',
      enum: ['처리 중', '배송 중', '완료'],
      errorMessage: {
        enum: '상태는 "처리 중", "배송 중", "완료" 중 하나여야 합니다.',
      },
    },
  },
  required: ['id', 'customerName', 'orderDate', 'status'],
  additionalProperties: false,
};

class ExternalSystemA extends ExternalSystemInterface {
  constructor() {
    super();
    this.systemId = 'systemA';
    this.validate = new Ajv({ allErrors: true }).compile(orderSchema);
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
      handleNetworkError(error);
    }
  }

  convert(order) {
    const statusConvert = (status) => {
      switch (status) {
        case '처리 중':
          return ORDER_STATUS.PROCESSING;
        case '배송 중':
          return ORDER_STATUS.ON_DELIVERY;
        case '완료':
          return ORDER_STATUS.COMPLETED;
      }
    };

    return new Order(
      this.systemId,
      order.id,
      order.customer,
      order.date,
      statusConvert(order.status)
    );
  }

  validateOrder(order) {
    const isValid = this.validate(order);
    if (!isValid) {
      console.log(`주문 데이터 오류: ${JSON.stringify(order, null, 2)}`);
      console.warn(
        `에러 내용: ${JSON.stringify(this.validate.errors, null, 2)}`
      );
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
