# Tesseract OCR for Node.js

[![Build Status](https://img.shields.io/travis/zapolnoch/node-tesseract-ocr/master.svg?style=flat-square)](https://travis-ci.org/zapolnoch/node-tesseract-ocr)
[![npm](https://img.shields.io/npm/v/node-tesseract-ocr.svg?style=flat-square)](https://www.npmjs.com/package/node-tesseract-ocr)
[![npm](https://img.shields.io/npm/dm/node-tesseract-ocr.svg?style=flat-square)](https://www.npmjs.com/package/node-tesseract-ocr)
[![Known Vulnerabilities](https://snyk.io/test/github/zapolnoch/node-tesseract-ocr/badge.svg)](https://snyk.io/test/github/zapolnoch/node-tesseract-ocr)

## Installation

First, you need to install the Tesseract project. Instructions for installing Tesseract for all platforms can be found on [the project site](https://github.com/tesseract-ocr/tessdoc/blob/master/Installation.md). On Debian/Ubuntu:

```bash
apt-get install tesseract-ocr
```

After you've installed Tesseract, you can go installing the npm-package:

```bash
npm install node-tesseract-ocr
```

## Usage

```js
const tesseract = require("node-tesseract-ocr")

const config = {
  lang: "eng", // default
  oem: 3,
  psm: 3,
}

async function main() {
  try {
    const text = await tesseract.recognize("image.jpg", config)
    console.log("Result:", text)
  } catch (error) {
    console.log(error.message)
  }
}

main()
```

Also you can pass URL:

```js
const img = "https://tesseract.projectnaptha.com/img/eng_bw.png"
const text = await tesseract.recognize(img)
```

or Buffer:

```js
const tesseract = require("node-tesseract-ocr")
const fs = require("fs/promises")

async function main() {
  const img = await fs.readFile("image.jpg")
  const text = await tesseract.recognize(img)

  console.log("Result:", text)
}
```

If you want to process multiple images in a single run, then pass an array:

```js
const images = ["./samples/file1.png", "./samples/file2.png"]
const text = await tesseract.recognize(images)
```

In the config object you can pass any [OCR options](https://github.com/tesseract-ocr/tesseract/blob/master/doc/tesseract.1.asc#options). Also you can pass here any [control parameters](https://tesseract-ocr.github.io/tessdoc/tess3/ControlParams) or use ready-made sets of [config files](https://github.com/tesseract-ocr/tesseract/tree/master/tessdata/configs) (like hocr):

```js
await tesseract.recognize("image.jpg", {
  load_system_dawg: 0,
  tessedit_char_whitelist: "0123456789",
  presets: ["tsv"],
})
```

## Alternatives

If you want to use Tesseract in the browser, choose [Tesseract.js](https://github.com/naptha/tesseract.js) package, which compiles original Tesseract from C to JavaScript WebAssembly. You can also use it in Node.js, but the performance may not be as good.
