# TDD-Node.js-APIserver

## Purpose

Node.JS기반의 RestAPI WebServer 구현하기

### `RestAPI`를 위한 기초 개념

**HTTP Method를 이용한 웹서버 자원관리에 대한 `행위`를 명시하는 API : `동사`**

- `GET` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 자원조회 | SELECT(READ)
- `POST`&nbsp;&nbsp;&nbsp;&nbsp; | 자원생성 | INSERT(CREATE)
- `PUT` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 자원수정 | UPDATE
- `DELETE` | 자원삭제 | DELETE

**HTTP Status Code**

- _1 x x : 전송 프로토콜 수준의 정보교환_
- _2 x x : 클라이언트 요청이 성공적으로 수행됨_
  - `200` : 성공(success) ~ `GET`, `PUT`
  - `201` : 작성(created) ~ `POST`
  - `204` : 폐기(no-contents) ~ `DELETE`
- _3 x x : 클라이언트 요청을 완료하기 위해 추가 행동이 필요함_
- _4 x x : 클라이언트의 잘못된 요청_
  - `400` : 잘못된 요청 (Bad Request) - ex. Parameter Error
  - `401` : 접근 권한 없음 (Unauthorized) - ex. Login-user & Guest-user
  - `403` : 조회 권한 없음 (Unauthorized) - ex. User & Admin permission
  - `404` : 찾을 수 없음 (Not found) - ex. No resource is detected.
  - `409` : 충돌 (Conflict) - ex. Resouce is already created
- _5 x x : 서버 측 처리방법에서 오류 발생하여 클라이언트 요청을 처리하지 못함_
  - `500` : 서버 에러 (Internal server error)

## History

### 프로젝트 생성 및 형상관리(git) 적용

```bash
  # 폴더 생성
  mkdir TDD-Node.js-APIserver
  cd TDD-Node.js-APIserver

  # 깃 초기화
  git init
  git config --local user.email dev2sponge@gmail.com
  git config --local user.name devJRL
  git config --local core.autocrlf true input  # for Mac

  # 로컬 깃 리포지토리 생성 및 원격 깃 리포지토리 동기화
  git remote add origin https://github.com/devJRL/TDD-Node.js-APIserver.git
  git fetch origin master
  git pull origin master

  # 브랜치 생성 및 체크아웃
  git branch rest
  git checkout rest

  # 스테이징 및 커밋
  git add .
  git commit -m "node.js 기반 RestAPI 구현 시작"
  git push origin rest
```

### Express.js 프로젝트 생성하기

개발 환경 구성

- [Node.js 설치](https://nodejs.org/ko/download/)
- [npm 설치](https://www.npmjs.com/get-npm)
- [yarn 설치](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Mac에서 간단하게 Node.js, npm, yarn 설치](https://junhobaik.github.io/install-node-yarn/)

```bash
  # 터미널에서 설치확인
  node -v # v12.8.0
  npm -v  # 6.10.2
  yarn -v # 1.16.0
```

Express.js 프로젝트 생성

```bash
  # 프로젝트 관리 시작
  yarn init
  # 프로젝트에 Express.js 추가
  yarn add express
  yarn add express-generator

  # Express 프로젝트 생성
  express --no-view -f .

  # Express 서버 시작
  yarn start
  # App listening on port 3000!
```

미들웨어 설치

```bash
  # Express 프로젝트가 생성될때 기본으로 사용하도록 지정된 모듈
  yarn add cookie-parser
  yarn add morgan

  # Reqeust Body 객체를 사용하기 위한 모듈
  yarn add body-parser
    ### << in app.js
    # const bodyParser = require("bady-parser");
    # app.use(bodyParser.json());
    # app.use(bodyParser.urlendcoed({ extended: true }));
```

### TDD (Test Driven Development, 테스트 주도 개발)

TDD 개발을 위하여 node에서 제공하는 라이브러리

- `단위테스트용 러너` : [mocha.js](https://mochajs.org/)
  - TestSuite : 테스트 환경을 꾸며주는 내부모듈 ~ describe()로 구현
  - TestCase : 실제 테스트코드 ~ it()

```bash
  # 설치 : 개발환경에서만 사용하는 의존모듈임을 명시하여 설치
  yarn add mocha --save-dev

  # 실행 : node가 아닌 mocha 라이브러리로 실행
  node_modules/.bin/mocha ./tdd_samples/mocha_sp.js
```

- `단위테스트 내부 검증용` : [should.js](https://github.com/shouldjs/should.js)
  - Node 공식 문서에서도 assert가 아닌 Third party library인 `should`를 사용하라고 적극권장
  - 검증(assertion) 라이브러리로, `가독성 높은 테스트 코드를 만들 수 있다`는 장점

```bash
  # 설치 : 개발환경에서만 사용하는 의존모듈임을 명시하여 설치
  yarn add should --save-dev
```

- `통합테스트` : [supertest.js](https://github.com/visionmedia/supertest)
  - node 서버를 내부에서 만들어 낸 뒤에, 자체적으로 웹 검증 테스트를 하는 모듈
  - 사용방법은 위 링크의 Example을 참고하여 확인합니다.

```bash
  # 설치 : 개발환경에서만 사용하는 의존모듈임을 명시하여 설치
  yarn add supertest --save-dev
```

### Node.js ORM library : Sequelize.js

시퀄라이즈(sequelize.js)를 사용하면 데이터베이스의 테이블을 추상화한 `Model`을 이용하여 `자동으로 SQL을 생성하는 함수를 호출`한다.

```bash
  # 시퀄라이즈 설치
  yarn add sequelize
  # 시퀄라이즈가 동기화할때 사용할 파일기반 DB 라이브러리 설치
  yarn add sqlite
```

SQL로 수행하는 CRUDS는 아래와 같이 함수로 대체 호출해서 생성된다.

```javascript
// SELECT * FROM users;
User.findAll();

// INSERT users (`name`) VALUES ('alice');
User.create({ name: "alice" });

// UPDATE users SET name = 'bek' WHERE id = 1;
User.update({ name: "bek" }, { where: { id: 1 } });

// DELETE FROM users WHERE id = 1;
User.destroy({ where: { id: 1 } });
```
