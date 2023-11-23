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
      span {
        font-family: 'thisFont';
        font-size: 13px
      }
    </style>
  </head>  
  <span>{{{_content}}}</span>
</html>
`
const regularFonts = Object.fromEntries(
  Object.entries(fonts)
    .filter(([key]) => key.includes('Regular'))
);

const contentArray = Object.entries(regularFonts)
  .map(([name, path]) => {
    return {
      _fontData: font2base64.encodeToDataUrlSync('./fonts/' + path),
      _content: name.replace(' Regular', ''),
      output: 'fonts-images/' + name.replace(' Regular', '.png')
    }
  });

nodeHtmlToImage({
  output: './image.png',
  transparent: true,
  selector: 'span',
  html,
  content: contentArray
})
  .then(() => console.log('The image was created successfully!'))