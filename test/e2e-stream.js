const fs = require("fs")
const test = require("tape")
const { recognize } = require("../src/index.js")

test("recognize from stream", async (assert) => {
  assert.plan(1)

  const img = fs.readFileSync("./test/samples/file1.png")
  const result = await recognize(img)

  assert.equal(result.trim().toLowerCase(), "success")
})

test("recognize from URL stream", async (assert) => {
  assert.plan(1)

  const img = `https://tesseract-ocr.github.io/tessdoc/images/bilingual.png`
  const result = await recognize(img)

  assert.strictEqual(result.trim(), "fect S 3tatsht\nHINDI TO\nENGLISH")
})

test("recognize array", async (assert) => {
  assert.plan(1)

  const imgs = ["./test/samples/file1.png", "./test/samples/file2.png"]
  const result = await recognize(imgs)

  assert.equal(
    result
      .trim()
      .replace(/[\r\n\f]/g, "")
      .toLowerCase(),
    "success5552368",
  )
})
