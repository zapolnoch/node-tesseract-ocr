const test = require("tape")
const rewire = require("rewire")
const tesseract = rewire("../index.js")

// Mock child_process
tesseract.__set__("exec", (path, cb) => {
  cb(null, path)
})

test("custom binary", ({ equal, plan }) => {
  plan(1)

  tesseract
    .recognize("pic.jpg", {
      binary: "tess",
    })
    .then(result => equal(result, "tess pic.jpg stdout"))
})

test("set language", ({ equal, plan }) => {
  plan(1)

  tesseract
    .recognize("pic.jpg", {
      lang: "eng",
    })
    .then(result => equal(result, "tesseract pic.jpg stdout -l eng"))
})

test("filename with spaces", ({ equal, plan }) => {
  plan(1)

  tesseract
    .recognize("path/to my/pic.jpg")
    .then(result => equal(result, 'tesseract "path/to my/pic.jpg" stdout'))
})

test("filename with spaces - qouted input", ({ equal, plan }) => {
  plan(1)

  tesseract
    .recognize('"path/to my/pic.jpg"')
    .then(result => equal(result, 'tesseract "path/to my/pic.jpg" stdout'))
})

test("use presets", ({ equal, plan }) => {
  plan(1)

  tesseract
    .recognize("pic.jpg", {
      presets: ["hocr", "digits"],
    })
    .then(result => equal(result, "tesseract pic.jpg stdout hocr digits"))
})

test("set OCR options", ({ equal, plan }) => {
  plan(1)

  tesseract
    .recognize("pic.jpg", {
      oem: 1,
      psm: 3,
      dpi: 300,
      "tessdata-dir": "file",
      "user-words": "file",
      "user-patterns": "file",
    })
    .then(result =>
      equal(
        result,
        "tesseract pic.jpg stdout --oem 1 --psm 3 --dpi 300 --tessdata-dir file --user-words file --user-patterns file",
      ),
    )
})

test("set control params", ({ equal, plan }) => {
  plan(1)

  tesseract
    .recognize("pic.jpg", {
      tessedit_char_whitelist: "0123456789",
    })
    .then(result => equal(result, "tesseract pic.jpg stdout -c tessedit_char_whitelist=0123456789"))
})
