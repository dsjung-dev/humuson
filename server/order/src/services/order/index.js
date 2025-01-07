const Order = require('./orderModel');

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
  const order = orders.find((o) => o.id === id);
  if (!order) {
    throw new Error('주문을 찾을 수 없습니다.');
  }
  return order;
};

module.exports = {
  createOrder,
  readAllOrders,
  readOrderbyId,
};
