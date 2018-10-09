# Tesseract OCR for Node.js

## Installation
First, you need to install the Tesseract project. Instructions for installing Tesseract for all platforms can be found on [the project site](https://github.com/tesseract-ocr/tesseract/wiki). On Debian/Ubuntu:
```bash
apt-get install tesseract-ocr
```

After you've installed Tesseract, you can go installing the npm-package:
```bash
npm install node-tesseract-ocr
```

## Usage
```js
const tesseract = require('node-tesseract-ocr')

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3
}

tesseract
  .recognize('./path/to/image.jpg', config)
  .then(text => {
    console.log('Result:', text)
  })
  .catch(err => {
    console.log('error:', err)
  })
```

In the config object you can pass any [OCR options](https://github.com/tesseract-ocr/tesseract/wiki/Command-Line-Usage). Also you can pass here any [control parameters](https://github.com/tesseract-ocr/tesseract/wiki/ControlParams) or use ready-made sets of [config files](https://github.com/tesseract-ocr/tesseract/tree/master/tessdata/configs) (like hocr):
```js
tesseract.recognize('./path/to/image.jpg', {
  load_system_dawg: 0,
  tessedit_char_whitelist: '0123456789',
  presets: ['hocr', 'digits']
}).then(text => {
  console.log('result:', text)
})
```
