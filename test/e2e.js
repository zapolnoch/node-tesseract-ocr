const assert = require('assert')
const { recognize } = require('../index.js')

recognize('./test/file1.png', {
  lang: 'eng'
}).then(text => {
  assert.strictEqual(text.trim().toLowerCase(), 'success')
})

recognize('./test/file2.png', {
  tessedit_char_whitelist: '0123456789'
}).then(text => {
  assert.strictEqual(text.trim(), '5552368')
})
