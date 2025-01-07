const express = require('express');
const orderController = require('./orderController');

const router = express.Router();

// 주문 데이터 처리 API
router.post('/orders/', orderController.createOrder); // 외부 주문 데이터 수신
router.get('/orders/', orderController.readAllOrders); // 주문 리스트 조회
router.get('/orders/:id', orderController.readOrderById); // 주문 ID로 조회

module.exports = router;
