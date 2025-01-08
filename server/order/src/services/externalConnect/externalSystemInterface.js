class ExternalSystemInterface {
  // 외부 시스템으로 주문 데이터 조회 요청
  async fetchOrders() {
    throw new Error('fetchOrders() 메서드는 반드시 구현해야 합니다.');
  }

  // 외부 주문 데이터 검증
  validateOrder(order) {
    throw new Error('validateOrder() 메서드는 반드시 구현해야 합니다.');
  }

  // 외부 주문 데이터 -> 내부 주문 데이터 변환
  convert(order) {
    throw new Error('convert() 메서드는 반드시 구현해야 합니다.');
  }
}

module.exports = ExternalSystemInterface;
