const handleNetworkError = (systemName, error) => {
  if (error.response) {
    // 서버가 응답했지만 4xx, 5xx 상태 코드
    console.error(
      `${systemName} 서버 오류: ${error.response.status} - ${error.response.data}`
    );
    throw new Error(`${systemName} API에서 서버 오류가 발생했습니다.`);
  } else if (error.request) {
    // 요청이 전송되었으나 응답 없음
    console.error(`${systemName} 응답 없음. 네트워크 문제일 수 있습니다.`);
    throw new Error(
      `${systemName} API 응답이 없습니다. 네트워크 상태를 확인하세요.`
    );
  } else {
    // 기타 네트워크 설정 오류
    console.error(`${systemName} 요청 실패: ${error.message}`);
    throw new Error(`${systemName} API 요청에 실패했습니다.`);
  }
};

module.exports = handleNetworkError;
