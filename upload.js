import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { Glob } from 'glob'

async function uploadFile (filepath, type = 'font') {
    const data = new FormData()
    data.append('api_key', 'Q^qH*X3FhmdB')
    data.append('type', type)
    data.append('file', fs.createReadStream(filepath))

    return axios.request({
        method: 'post',
        url: 'https://api-test.vidnoz.com/ai/source/system-upload',
        headers: {
            'Authorization': 'Bearer phC1UjWsn-EP9XHwuXnbO8ahMxd4No05_2028178334',
            ...data.getHeaders()
        },
        data: data
    })
}

const gFonts = new Glob(['fonts/*.{ttf,otf}', 'fonts-images/*.png'], { nodir: true })
for (const filepath of gFonts) {
    console.log("🚀 ~ filepath:", filepath)
    const response = await uploadFile(filepath)
    console.log("🚀 ~ response:", response.data)
}

const gEots = new Glob(['eots/*.eot'], { nodir: true })
for (const filepath of gEots) {
    console.log("🚀 ~ filepath:", filepath)
    const response =  await uploadFile(filepath, 'eot')
    console.log("🚀 ~ response:", response.data)
}
