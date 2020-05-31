const test = require("tape")
const { recognize } = require("../index.js")

test("recognize text", async (assert) => {
  assert.plan(1)

  const result = await recognize("./test/samples/file1.png", {
    lang: "eng",
  })

  assert.equal(result.trim().toLowerCase(), "success")
})

test("recognize numbers", async (assert) => {
  assert.plan(1)

  const result = await recognize("./test/samples/file2.png", {
    tessedit_char_whitelist: "0123456789",
  })

  assert.strictEqual(result.trim(), "5552368")
})

test("non-latin filename", async (assert) => {
  assert.plan(1)

  const result = await recognize("./test/samples/имя файла.png", {
    tessedit_char_blacklist: "0123456789",
  })

  assert.strictEqual(result.trim(), "ok")
})
