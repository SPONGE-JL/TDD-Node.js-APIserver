/* 
 # SuperTest.js를 이용하여 테스트 코드 작성
 ? ./node_modules/.bin/mocha ./app.spec.js
 */
const should = require("should");
const request = require("supertest");

const app = require("./app");

describe("GET /users 는", () => {
  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답함", done => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done(); // 비동기 처리할 테스트코드가 완료되었음을 알려줌
        });
    });
  });
});
