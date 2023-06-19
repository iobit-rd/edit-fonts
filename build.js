import fs from 'fs'
import path from 'path'

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
for (const file of g) {
    const newpath = trimFontFileName(file)
    if (newpath) {
        console.log(path.basename(file), '->', path.basename(newpath))
    }
}
