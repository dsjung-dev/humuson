const orderService = require('../../services/order');
const errorHandler = require('../../utils/errorHandler');

const createOrder = (req, res) => {
  try {
    const newOrder = orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    errorHandler(res, error);
  }
};

const readAllOrders = (req, res) => {
  try {
    const orders = orderService.readAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    errorHandler(res, error);
  }
};

const readOrderById = (req, res) => {
  try {
    const order = orderService.readOrderbyId(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};

// 외부 API로부터 특정 시스템의 데이터 수집
const fetchExternalOrders = async (req, res) => {
  const { system } = req.body; // systemA, systemB 중 선택
  try {
    const result = await orderService.fetchOrdersFromExternalSystem(system);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  createOrder,
  readAllOrders,
  readOrderById,
  fetchExternalOrders,
};
