# TDD-Node.js-APIserver

## Purpose

Node.JS기반의 RestAPI WebServer 구현하기

## Command History

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

### RestAPI & CRUD

**HTTP Method를 이용한 웹서버 자원관리에 대한 `행위`를 명시하는 API : `동사`**

- `GET` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 자원조회 | SELECT(READ)
- `POST`&nbsp;&nbsp;&nbsp;&nbsp; | 자원생성 | INSERT(CREATE)
- `PUT` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 자원수정 | UPDATE
- `DELETE` | 자원삭제 | DELETE

**HTTP Status Code**

- _1 x x : 아직 처리중_
- _2 x x : 결과 리턴 (정상)_
  - `200` : 성공(success) ~ `GET`, `PUT`
  - `201` : 작성(created) ~ `POST`
  - `204` : 폐기(no-contents) ~ `DELETE`
- _3 x x : 연결 종료_
- _4 x x : 클라이언트 측 문제 (요청방법의 문제)_
  - `400` : 잘못된 요청 (Bad Request) - ex. parameter error
  - `401` : 접근 권한 없음 (Unauthorized) - ex. login & no-login
  - `403` : 조회 권한 없음 (Unauthorized) - ex. user & admin permission
  - `404` : 찾을 수 없음 (Not found) - ex. no server side page
  - `409` : 충돌 (Conflict) - ex. already created resource
- _5 x x : 서버 측 문제 (서버처리방법의 문제)_
  - `500` : 서버 에러 (Internal server error)
