const fs = require("fs")
const test = require("tape")
const { recognize } = require("../index.js")

test("recognize text from stream", async (assert) => {
  assert.plan(1)

  const img = fs.readFileSync("./test/samples/file1.png")
  const result = await recognize(img, { lang: "eng" })

  assert.equal(result.trim().toLowerCase(), "success")
})

test("recognize numbers from stream", async (assert) => {
  assert.plan(1)

  const img = fs.readFileSync("./test/samples/file2.png")
  const result = await recognize(img, { tessedit_char_whitelist: "0123456789" })

  assert.strictEqual(result.trim(), "5552368")
})

test("stream from non-latin filename", async (assert) => {
  assert.plan(1)

  const img = fs.readFileSync("./test/samples/имя файла.png")
  const result = await recognize(img, { tessedit_char_blacklist: "0123456789" })

  assert.strictEqual(result.trim(), "ok")
})
