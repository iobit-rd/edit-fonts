import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { Glob } from "glob";

async function uploadFile(filepath) {
  const data = new FormData();
  data.append("api_key", "Q^qH*X3FhmdB");
  data.append("type", "font");
  data.append("file", fs.createReadStream(filepath));

  return axios.request({
    method: "post",
    url: "https://main-api-test.vidwud.com/apps/source/system-upload",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  });
}

const g = new Glob(["fonts/*.{ttf,otf}", "fonts-images/*.png", "font-objects/*.eot"], { nodir: true });
for (const filepath of g) {
  console.log("🚀 ~ filepath:", filepath);
  await uploadFile(filepath);
}
