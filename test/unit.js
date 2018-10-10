const assert = require('assert')
const rewire = require('rewire')
const tesseract = rewire('../index.js')

tesseract.__set__('exec', (path, cb) => {
  assert.strictEqual(path, [
    'tesseract ./test/test.png stdout',
    '-l eng',
    '--oem 1 --psm 3',
    '-c tessedit_char_whitelist=0123456789',
    'hocr digits'
  ].join(' '))
  cb(null, 'text')
})

tesseract.recognize('./test/test.png', {
  lang: 'eng',
  oem: 1,
  psm: 3,
  tessedit_char_whitelist: '0123456789',
  presets: ['hocr', 'digits']
}).then(result => {
  assert.strictEqual(result, 'text')
})
