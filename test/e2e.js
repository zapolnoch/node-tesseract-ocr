const test = require("tape")
const { recognize } = require("../index.js")

test("recognize text", assert => {
  assert.plan(1)

  recognize("./test/samples/file1.png", {
    lang: "eng",
  }).then(text => {
    assert.equal(text.trim().toLowerCase(), "success")
  })
})

test("recognize numbers", assert => {
  assert.plan(1)

  recognize("./test/samples/file2.png", {
    tessedit_char_whitelist: "0123456789",
  }).then(text => {
    assert.strictEqual(text.trim(), "5552368")
  })
})
