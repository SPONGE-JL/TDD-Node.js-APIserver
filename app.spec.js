/* 
 # SuperTest.js를 이용하여 테스트 코드 작성
 ? ./node_modules/.bin/mocha ./app.spec.js
 */
const should = require("should");
const request = require("supertest");

const app = require("./app");

// # TDD-1
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

// # TDD-2
describe("GET /users/1 는", () => {
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다", done => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", done => {
      request(app)
        .get("/users/one")
        .expect(400)
        .end(done);
    });
    it("id로 유저를 찾을 수 없을 경우 404로 응답한다.", done => {
      request(app)
        .get("/users/99")
        .expect(404)
        .end(done);
    });
  });
});
