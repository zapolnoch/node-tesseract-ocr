const fs = require("fs")
const path = require("path")

const binName = process.platform === "win32" ? "tesseract.exe" : "tesseract"
const pathEnvSep = process.platform === "win32" ? ";" : ":"
const systemDrive = process.env.SystemDrive

const fallbackPaths = {
    win32: [
        `${systemDrive}\\Program Files\\Tesseract-OCR`,
        `${systemDrive}\\Program Files (x86)\\Tesseract-OCR`,
    ],
};

module.exports = function () {
    const folderPaths = [
        ...process.env.PATH.split(pathEnvSep),
        ...(fallbackPaths[process.platform] || [])
    ]

    for (let i = 0; i < folderPaths.length; i++) {
        const binPath = path.resolve(folderPaths[i], binName)
        if (fs.existsSync(binPath)) return binPath
    }
}