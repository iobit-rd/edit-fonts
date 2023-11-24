import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { Glob } from 'glob'

async function uploadFile (filepath) {
    const data = new FormData()
    data.append('api_key', 'Q^qH*X3FhmdB')
    data.append('type', 'font')
    data.append('file', fs.createReadStream(filepath))

    return axios.request({
        method: 'post',
        url: 'https://api-test.vidnoz.com/ai/source/system-upload',
        headers: {
            ...data.getHeaders()
        },
        data: data
    })
}


const g = new Glob('fonts-images/*.png', { nodir: true })
for (const filepath of g) {
    console.log("🚀 ~ file: upload.js:36 ~ filepath:", filepath)
    await uploadFile(filepath)
}