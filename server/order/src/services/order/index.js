const Order = require('./orderModel');
const { ExternalSystemFactory } = require('../externalConnect');

// db 레이어 생략
const orders = [];

const createOrder = (orderData) => {
  const { orderId, customerName, orderDate, status } = orderData;

  if (!orderId || !customerName || !orderDate || !status) {
    throw new Error('필수 데이터 누락');
  }

  const newOrder = new Order(orderId, customerName, orderDate, status);
  orders.push(newOrder);
  return newOrder;
};

const readAllOrders = () => {
  return orders;
};

const readOrderbyId = (orderId) => {
  const order = orders.find((o) => o.orderId === orderId);

  return order;
};

const fetchOrdersFromExternalSystem = async (system) => {
  try {
    const externalSystem = ExternalSystemFactory.getInstance(system);
    const convertedOrders = await externalSystem.fetchOrders();

    orders.push(...convertedOrders);

    return {
      message: `${convertedOrders.length}개의 주문 데이터를 저장했습니다.`,
    };
  } catch (error) {
    console.error(`${system} 시스템에서 데이터 가져오기 실패:`, error.message);
    throw new Error(`${system} 시스템 연동 실패`);
  }
};

module.exports = {
  createOrder,
  readAllOrders,
  readOrderbyId,
  fetchOrdersFromExternalSystem,
};
