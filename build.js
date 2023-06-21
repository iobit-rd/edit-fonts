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
for (const filepath of g) {

    const newpath = trimFontFileName(filepath)
    if (newpath) {
        console.log(path.basename(filepath), '->', path.basename(newpath))
    }

    const fontpath = newpath || filepath
    const font = fontkit.openSync(newpath || filepath)
    fontsInfo[font.fullName] = path.basename(fontpath)
}

fs.writeFileSync('edit-fonts.js', `export const fonts = ${util.inspect(fontsInfo)}`)