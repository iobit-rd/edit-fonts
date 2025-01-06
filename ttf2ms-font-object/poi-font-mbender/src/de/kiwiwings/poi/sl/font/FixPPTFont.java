package de.kiwiwings.poi.sl.font;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import org.apache.poi.xslf.usermodel.XMLSlideShow;

public class FixPPTFont {
    public static void main(String[] args) throws Exception {
        // 加载现有的PPTX文件
        File pptxFile = new File("test.pptx");
        try (FileInputStream fis = new FileInputStream(pptxFile)) {
            XMLSlideShow ppt = new XMLSlideShow(fis);

            // 创建 SlideShowFontEmbedder 实例
            SlideShowFontEmbedder emb = new SlideShowFontEmbedder(ppt);

            // 嵌入字体
            emb.embed(new File("data/fonts/Poppins-Regular.ttf"));
            emb.embed(new File("data/fonts/Poppins-Bold.ttf"));
            emb.embed(new File("data/fonts/Poppins-Italic.ttf"));
            emb.embed(new File("data/fonts/Poppins-BoldItalic.ttf"));

            emb.embed(new File("data/fonts/Orbitron-Regular.ttf"));
            emb.embed(new File("data/fonts/Orbitron-Bold.ttf"));

            emb.embed(new File("data/fonts/Fraunces72pt-Regular.ttf"));
            emb.embed(new File("data/fonts/Fraunces72pt-Italic.ttf"));
            emb.embed(new File("data/fonts/Fraunces72pt-Bold.ttf"));
            emb.embed(new File("data/fonts/Fraunces72pt-BoldItalic.ttf"));

            emb.embed(new File("data/fonts/Belanosima-SemiBold.ttf"));

            // 保存修改后的PPTX文件
            try (FileOutputStream fos = new FileOutputStream("test_fixed.pptx")) {
                ppt.write(fos);
            }
        }
    }
}
