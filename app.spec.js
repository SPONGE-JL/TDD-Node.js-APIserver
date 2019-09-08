/* 
 # SuperTest.js를 이용하여 테스트 코드 작성
 ? ./node_modules/.bin/mocha ./app.spec.js
 */
const should = require("should");
const request = require("supertest");

const app = require("./app");

describe("GET /users 는", () => {
  describe("성공시", () => {
    // ? TestCase
    it("유저 객체를 담은 배열로 응답한다", done => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done(); // 비동기 처리할 테스트코드가 완료되었음을 알려줌
        });
    });
    // ? TestCase
    it("최대 limit 개수만큼 응답한다", done => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.be.lengthOf(2);
          done(); // 비동기 처리할 테스트코드가 완료되었음을 알려줌
        });
    });
  });
  describe("실패시", () => {
    // ? TestCase
    it("limit이 숫자형이 아니면 400을 응답한다.", done => {
      request(app)
        .get("/users?limit=two")
        .expect(400)
        .end(done);
    });
  });
});
