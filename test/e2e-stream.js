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

  const img = "https://upload.wikimedia.org/wikipedia/commons/d/d4/Miller_font.png"
  const result = await recognize(img)

  assert.strictEqual(result.trim(), "Miller")
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
