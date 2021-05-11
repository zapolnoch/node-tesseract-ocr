const test = require("tape")
const rewire = require("rewire")
const tesseract = rewire("../src/index.js")

// Mock child_process
tesseract.__set__("exec", (path, cb) => {
  cb(null, path)
})
tesseract.__set__("pipeInput", () => null)

test("custom binary", async ({ equal, plan }) => {
  plan(1)

  const result = await tesseract.recognize("pic.jpg", {
    binary: "tess",
  })

  equal(result, 'tess "pic.jpg" stdout')
})

test("set language", async ({ equal, plan }) => {
  plan(1)

  const result = await tesseract.recognize("pic.jpg", {
    lang: "eng",
  })

  equal(result, 'tesseract "pic.jpg" stdout -l eng')
})

test("filename with spaces", async ({ equal, plan }) => {
  plan(1)

  const result = await tesseract.recognize("path/to my/pic.jpg")
  equal(result, 'tesseract "path/to my/pic.jpg" stdout')
})

test("use presets", async ({ equal, plan }) => {
  plan(1)

  const result = await tesseract.recognize("pic.jpg", {
    presets: ["hocr", "digits"],
  })
  equal(result, 'tesseract "pic.jpg" stdout hocr digits')
})

test("set OCR options", async ({ equal, plan }) => {
  plan(1)

  const result = await tesseract.recognize("pic.jpg", {
    oem: 1,
    psm: 3,
    dpi: 300,
    "tessdata-dir": "dir",
    "user-words": "word",
    "user-patterns": "pattern",
  })

  equal(
    result,
    'tesseract "pic.jpg" stdout --oem 1 --psm 3 --dpi 300 --tessdata-dir dir --user-words word --user-patterns pattern',
  )
})

test("set control params", async ({ equal, plan }) => {
  plan(1)

  const result = await tesseract.recognize("pic.jpg", {
    tessedit_char_whitelist: "0123456789",
  })

  equal(result, 'tesseract "pic.jpg" stdout -c tessedit_char_whitelist=0123456789')
})

test("result to stdin", async ({ equal, plan }) => {
  plan(2)

  const resultFromUrl = await tesseract.recognize("http://example.com/pic.jpg")
  equal(resultFromUrl, "tesseract stdin stdout")

  const resultFromArray = await tesseract.recognize(["file1.jpg", "file2.png"])
  equal(resultFromArray, "tesseract stdin stdout")
})
