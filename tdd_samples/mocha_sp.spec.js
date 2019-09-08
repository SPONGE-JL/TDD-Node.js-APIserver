/*
 * mocha.js의 명세서로서 테스트코드를 작성
 */
const mocha_sp = require("./mocha_sp");
const should = require("should"); // ! 검증 라이브러리 (node에서 권장하는 써드파티 라이브러리)

// 테스트 수트 생성
describe("mocha.js 모듈은 ", () => {
  // 테스트 코드
  it("문자열의 첫번째 문자를 대문자로 변환한다.", () => {
    // 실제 테스트 수행
    const result = mocha_sp.capitailize("Hello"); // 이 문자를 바꾸어서 테스트
    result.should.be.equal("Hello"); // ! 더 직관적인 검증이 가능
  });
});

/* 
 # Mocha.js를 이용하여 테스트코드로 실행
 ? ./node_modules/.bin/mocha ./tdd_samples/mocha_sp.js
 */

/* 
 ! "Hello"를 입력한 경우

  mocha.js 모듈은 
    ✓ 문자열의 첫번째 문자를 대문자로 변환한다.

  1 passing (4ms)

 */

/* 
 ! "hello"를 입력한 경우

    mocha.js 모듈은 
    1) 문자열의 첫번째 문자를 대문자로 변환한다.

  0 passing (8ms)
  1 failing

  1) mocha.js 모듈은 
       문자열의 첫번째 문자를 대문자로 변환한다.:

      AssertionError [ERR_ASSERTION]: 'hello' == 'Hello'
      + expected - actual

      -hello
      +Hello
      
      at Context.<anonymous> (tdd_samples/mocha_sp.spec.js:13:12)
      at processImmediate (internal/timers.js:439:21)
 */
