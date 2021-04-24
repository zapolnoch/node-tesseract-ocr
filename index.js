const exec = require("child_process").exec
const log = console.debug

function recognize(input, config = {}) {
  const options = getOptions(config)
  const binary = config.binary || "tesseract"
  const inputOption =
    typeof input === "string" && !input.match(/^https?:\/\//) ? `"${input}"` : "stdin"
  const command = [binary, inputOption, "stdout", ...options].join(" ")

  if (config.debug) log("command", command)

  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      if (config.debug) log(stderr)
      if (error) reject(error)
      resolve(stdout)
    })
    if (inputOption === "stdin") pipeInput(input, child)
  })
}

function pipeInput(input, child) {
  if (typeof input === "string") {
    const protocol = input.match(/^(.*?):/)[1]
    return require(protocol).get(input, (response) => {
      response.pipe(child.stdin)
    })
  }
  if (Array.isArray(input)) input = Buffer.from(input.join("\n"), "utf-8")
  child.stdin.write(input)
  child.stdin.end()
}

function getOptions(config) {
  const ocrOptions = ["tessdata-dir", "user-words", "user-patterns", "psm", "oem", "dpi"]

  return Object.entries(config)
    .map(([key, value]) => {
      if (["debug", "presets", "binary"].includes(key)) return
      if (key === "lang") return `-l ${value}`
      if (ocrOptions.includes(key)) return `--${key} ${value}`

      return `-c ${key}=${value}`
    })
    .concat(config.presets)
    .filter(Boolean)
}

module.exports = {
  recognize,
}
