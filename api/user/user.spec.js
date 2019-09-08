/*
 * Test Code [/users/**]
 */
const should = require("should");
const request = require("supertest");

const app = require("../../app");
const models = require("../../data/sequelize-define");

// # TDD-1 GET
describe("GET /users 는", () => {
  describe("성공시", () => {
    // ! DB sync (데이터 동기화를 동기처리)
    before(() => models.sequelize.sync({ force: true }));
    // ! Insert Sample Data
    const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
    before(() => models.User.bulkCreate(users));
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

describe("GET /users/:id 는", () => {
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

// # TDD-2 DELETE
// > mocha의 only함수를 이용하여 단독체크
describe.only("DELETE /users/1", () => {
  describe("성공시", () => {
    it("204를 응답한다.", done => {
      request(app)
        .delete("/users/1")
        .expect(204)
        .end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우, 400으로 응답한다.", done => {
      request(app)
        .delete("/users/one")
        .expect(400)
        .end(done);
    });
  });
});

// # TDD-3 POST
describe("POST /users 는", () => {
  let name = "daniel";
  describe("성공시", () => {
    let body;
    before(done => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환한다.", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환한다.", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라미터 누락시 400을 반환한다.", done => {
      request(app)
        .post("/users")
        .send({})
        .expect(400)
        .end(done);
    });
    it("name이 중복될 경우 409를 반환한다.", done => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(409)
        .end(done);
    });
  });
});

// # TDD-4 PUT
describe("PUT /users/:id 는", () => {
  describe("성공시", () => {
    let name = "chenn";
    it("변경된 name을 응답한다.", done => {
      request(app)
        .put("/users/3")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
});

describe("PUT /users/:id 는", () => {
  describe("실패시", () => {
    it("정수가 아닌 id인 경우 400을 응답한다.", done => {
      request(app)
        .put("/users/one")
        .expect(400)
        .end(done);
    });
    it("전달받은 name이 없을 경우 400을 응답한다.", done => {
      request(app)
        .put("/users/1")
        .expect(400)
        .end(done);
    });
    it("없는 유저일 경우 404 응답한다.", done => {
      request(app)
        .put("/users/999")
        .send({ name: "foo" })
        .expect(404)
        .end(done);
    });
    it("이름이 중복일 경우 409 응답한다.", done => {
      request(app)
        .put("/users/3")
        .send({ name: "chris" })
        .expect(409)
        .end(done);
    });
  });
});
