const exec = require('child_process').exec
const log = console.debug

function recognize (filename, config = {}) {
  const options = getOptions(config)
  const binary = config.binary || 'tesseract'

  const command = [binary, filename, 'stdout', ...options].join(' ')
  if (config.debug) log('command', command)

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (config.debug) log(stderr)
      if (error) reject(error)
      resolve(stdout)
    })
  })
}

function getOptions (config) {
  const ocrOptions = ['tessdata-dir', 'user-words', 'user-patterns', 'psm', 'oem']

  return Object.keys(config)
    .map(key => {
      if (['debug', 'presets'].includes(key)) return
      if (key === 'lang') return `-l ${config[key]}`
      if (ocrOptions.includes(key)) return `--${key} ${config[key]}`

      return `-c ${key}=${config[key]}`
    })
    .concat(config.presets)
    .filter(key => Boolean(key))
}

module.exports = {
  recognize
}
