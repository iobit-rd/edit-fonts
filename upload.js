import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { Glob } from "glob";
import { execSync } from "child_process";

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

console.log("🚀 ~ begin checking");

// 检查是否存在otf字体
const otfPathList = new Glob("fonts/*.otf", { nodir: true });
for (const filepath of otfPathList) console.log("🚀 ~ convert to ttf:", filepath);
if (otfPathList.length > 0) {
  throw new Error("Exists OTF font file, please check them first.");
}

console.log("🚀 ~ begin converting");

// 调用java ttf 转 fontdata
execSync("java -jar convert-ttf2object.jar");

// 检查 ttf字体个数 和 fontdata 字体个数是否一致
const ttfPathList = new Glob("fonts/*.ttf", { nodir: true });
const fontdataPathList = new Glob("font-objects/*.eot", { nodir: true });
if (ttfPathList.length !== fontdataPathList.length) {
  throw new Error("ttf and fontdata count not equal.");
}

console.log("🚀 ~ begin uploading");

// 上传文件到服务器
const uploadPathList = new Glob(["fonts/*.ttf", "fonts-images/*.png", "font-objects/*.eot"], { nodir: true });
for (const filepath of uploadPathList) {
  console.log("🚀 ~ filepath:", filepath);
  await uploadFile(filepath);
}
