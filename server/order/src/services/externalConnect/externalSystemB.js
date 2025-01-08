const axios = require('axios');
const ExternalSystemInterface = require('./externalSystemInterface');
const { Order, ORDER_STATUS } = require('../../services/order/orderModel');
const handleNetworkError = require('./networkErrorHandler');
const Ajv = require('ajv');

// 주문 데이터 스키마
const orderSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', minLength: 1, maxLength: 10 },
    buyer_name: { type: 'string', minLength: 1, maxLength: 20 },
    purchase_date: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
    state: {
      type: 'string',
      enum: ['처리 중', '배송 중', '완료'],
    },
  },
  required: ['id', 'buyer_name', 'purchase_date', 'state'],
  additionalProperties: false,
};

class ExternalSystemB extends ExternalSystemInterface {
  constructor() {
    super();
    this.systemId = 'systemB';
    this.validate = new Ajv({ allErrors: true }).compile(orderSchema);
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
          state: '배송 중',
        },
        {
          id: '2025010803',
          buyer_name: '주문자3',
          purchase_date: '2025-01-08',
          state: '완료',
        },
        {
          id: '2025010804',
          buyerName: '주문자4', // 필드값 잘못됨
          purchase_date: '2025-01-08',
          state: '완료',
        },
        {
          id: '2025010805',
          buyer_name: '주문자5',
          purchase_date: '2025/01/08', // 날짜 형식 에러
          state: '완료',
        },
        {
          id: '2025010806',
          buyer_name: '주문자6',
          purchase_date: '2025-01-08',
          state: '취소', // 상태값 에러
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
      order.buyer_name,
      order.purchase_date,
      statusConvert(order.state)
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
      instance = new ExternalSystemB();
    }
    return instance;
  },
};
