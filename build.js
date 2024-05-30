import fs from 'fs'
import path from 'path'
import util from 'util'

import * as fontkit from 'fontkit'
import { Glob } from 'glob'

function trimFontFileName (filepath) {
    const oldpath = path.resolve(filepath)
    const font = fontkit.openSync(oldpath)
    const newpath = path.format({
        dir: path.parse(oldpath).dir,
        ext: path.parse(oldpath).ext,
        name: font.postscriptName
    })

    if (oldpath === newpath) {
        // console.log('same')
    } else {
        fs.renameSync(oldpath, newpath)
        return newpath
    }
}

const g = new Glob('fonts/*.{ttf,otf}', { nodir: true })
const fontsInfo = {}
let familyNameArr = []
for (const filepath of g) {

    const newpath = trimFontFileName(filepath)
    if (newpath) {
        console.log(path.basename(filepath), '->', path.basename(newpath))
    }

    const fontpath = newpath || filepath
    const font = fontkit.openSync(newpath || filepath)
    fontsInfo[`${font.familyName} ${font.subfamilyName}`] = path.basename(fontpath)
    familyNameArr.unshift(font.familyName)
}
familyNameArr = [...new Set(familyNameArr)]

/** 将只有一个字体文件的字体设置为常规字体 */
const keys = Object.keys(fontsInfo)
for (let i = 0; i < familyNameArr.length; i++) {
    let contains = 0
    keys.forEach((fname) => {
        if (fname.includes(familyNameArr[i])) {
            contains = contains + 1
        }
    })
    if (contains === 1) {
        let deskey = ''
        for (let j = 0; j < keys.length; j++) {
            if (keys[j].includes(familyNameArr[i])) {
                deskey = keys[j]
                break
            }
        }
        const value = fontsInfo[deskey]
        delete fontsInfo[deskey]
        fontsInfo[`${familyNameArr[i]} Regular`] = value
    }
}

const fontArr = familyNameArr.filter((value) => {
    if (value.startsWith('Unicode BMP')) {
        return false
    } else if (value.startsWith('Noto Emoji')) {
        return false
    }
    return true
})

fs.writeFileSync('edit-fonts.js', `export const fonts = ${util.inspect(fontsInfo)}`)
fs.writeFileSync('edit-fontNames.js', `export const fonts = ${util.inspect(fontArr)}`)