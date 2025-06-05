import ttf2eot from 'ttf2eot'
import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const dir = path.join(__dirname, 'fonts')
const lists = fs.readdirSync(dir)
console.log(lists)
lists.forEach(file=>{
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if(stat.isFile){
        const ext = path.extname(filePath)
        const filename = path.parse(filePath).name
        if(ext === '.ttf'){
            console.log(`convert: ${filename}`)
            const data = fs.readFileSync(filePath)
            const unit8Array = new Uint8Array(data)
            const eotBuffer = ttf2eot(unit8Array)
            const todir = path.join(__dirname, 'eots')
              if (!fs.existsSync(todir)) {
                fs.mkdirSync(todir, { recursive: true })
            }

            const to = path.join(todir, `${filename}.eot`)
            fs.writeFileSync(to, eotBuffer)
        }
    }
})