/* 
 # SuperTest.js를 이용하여 테스트 코드 작성
 */
const app = require("./app");
const request = require("supertest");

describe("GET /users 는", () => {
  it("비동기 처리를 대기하도록 done 콜백함수 주입", done => {
    request(app)
      .get("/users")
      .end((err, res) => {
        console.log(res.body);
      });
    done(); // 비동기 처리할 테스트코드가 완료되었음을 알려줌
  });
  it("테스트 코드 수행 완료 후 done 콜백함수 호출", () => {});
});

/*
 # 통합 테스트 코드 실행
 ? ./node_modules/.bin/mocha ./app.spec.js
 */

/*
 ! 결과

    GET /users 는
      ✓ 비동기 처리를 대기하도록 done 콜백함수 주입
  GET /users 200 3.722 ms - 73
  [
    { id: 1, name: 'alice' },
    { id: 2, name: 'burky' },
    { id: 3, name: 'chris' }
  ]
      ✓ 테스트 코드 수행 완료 후 done 콜백함수 호출
 */
