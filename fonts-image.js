import nodeHtmlToImage from 'node-html-to-image'
import font2base64 from 'node-font2base64'
import { fonts } from './edit-fonts.js'

const html = `
<html>
  <head>
    <style>
      @font-face {
        font-family: 'thisFont';
        src: url("{{{_fontData}}}");
      }
      div {
        font-family: 'thisFont';
        font-size: 26px;
        display: inline-block;
        line-height: 60px;
        text-align: center;
        height: 60px;
      }
    </style>
  </head>  
  <div>
    {{{_content}}}
  </div>
</html>
`
const regularFonts = Object.fromEntries(
  Object.entries(fonts)
    .filter(([key]) => key.includes('Regular'))
);

const contentArray = Object.entries(regularFonts)
  .map(([name, path]) => {
    if (path === 'UnicodeBMPFallbackSIL.ttf') {
      return {}
    }
    return {
      _fontData: font2base64.encodeToDataUrlSync('./fonts/' + path),
      _content: name.replace(' Regular', ''),
      output: 'fonts-images/' + name.replace(' Regular', '.png')
    }
  });

nodeHtmlToImage({
  output: './image.png',
  transparent: true,
  selector: 'div',
  html,
  content: contentArray
})
  .then(() => console.log('The image was created successfully!'))