# humuson

휴머스온 과제를 위한 레포

## 과제 해석 및 고려사항

- 외부시스템에서 데이터를 가져오는 시점에 대해 설명이 없어서, 임의 API로 수행할 수 있도록 구현했습니다. (/api/orders/fetch)
- 외부시스템마다 주문 데이터가 다를 것을 고려
- 내부에서 관리하는 주문데이터를 별도로 스펙 정의
- 외부시스템에 데이터를 전송하는 부분에 대해, 외부시스템 -> 구현시스템 API 호출로 이해하였고, 주문 목록 조회/단일 조회 API를 구현
- 외부시스템에서 데이터를 접근하는거라 api-key validation 수행
- 외부시스템 http 통신에 대한 에러 핸들링
- 외부시스템 확장성을 고려한 구현 설계

## 개발환경

- Windows / vscode
- Node.js / Express
- node v22.13.0 (nodemon / yarn)
- Postman

## 로컬 실행 방법

(npm or yarn으로 패키지 설치 후)

```
server/order> yarn dev
or
server/order> node src/app.js
```

## 테스트 수행 방법

1. 외부 시스템(systemB)으로부터 데이터를 가져와서 저장

```
> curl -X POST 'http://127.0.0.1:3001/api/orders/fetch' \
-H "x-api-key: test-api-key" \
-H "Content-Type: application/json" \
-d '{ "system": "systemB" }'
```

2. 저장한 데이터 확인

```
(모든 주문 목록)
> curl -X GET http://127.0.0.1:3001/api/orders -H "x-api-key: test-api-key"

(단일 주문 by 주문ID)
> curl -X GET http://localhost:3001/api/orders/2025010801 -H "x-api-key: test-api-key"
```

## 기본 폴더 구조

```bash
├── src
│   ├── routes
│   │   └── api
│   │       ├── index.js            // 라우터 정의
│   │       └── orderController.js  // 주문 관련 컨트롤러 (응답 처리)
│   ├── services
│   │   ├── externalConnect     // 외부 연동을 위한 서비스 로직
│   │   └── order               // 주문 관련 서비스 로직
│   │       └── orderModel.js   // 내부에서 관리하는 order 데이터 정의
│   └── utils
├── .env                        // PORT, API_KEYS 등 정의
├── app.js                      // app 정의 및 서버 실행
└── package.json

```

## 클래스

#### class ExternalSystemInterface

- 외부 시스템 연동을 위한 인터페이스 정의
- 주문 데이터 조회 요청, 외부 주문 데이터 검증, 외부 주문 데이터 -> 내부 주문 데이터 변환 함수가 필수

#### class ExternalSystemA

- 위 인터페이스를 상속받아 SystemA 라는 외부시스템 연동을 위한 구현체
- SystemA의 Response 주문 데이터 스펙 정의 및 validation 수행
- 외부 시스템에 http 요청하여 주문 데이터를 가져와 내부 데이터로 변환. 유효한 데이터만 내부에 저장

#### class ExternalSystemB

> (현재는 테스트를 위해 HTTP 요청하지 않고, 하드 코딩되어 있음)

- 위 인터페이스를 상속받아 SystemB 라는 외부시스템 연동을 위한 구현체
- SystemB의 Response 주문 데이터 스펙 정의 및 validation 수행
- 외부 시스템에 http 요청하여 주문 데이터를 가져와 내부 데이터로 변환. 유효한 데이터만 내부에 저장

#### 외부 시스템 확장 구현 방법

1. ExternalSystemInterface 를 상속 받아 구현
2. 팩토리 패턴 사용으로 externalSystemFactory.js에 추가
3. 필요한 서비스 로직에서 호출
