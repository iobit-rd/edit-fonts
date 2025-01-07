package de.kiwiwings.poi.sl.font;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import de.kiwiwings.sfntly.Font;
import de.kiwiwings.sfntly.FontFactory;
import de.kiwiwings.sfntly.eot.EOTWriter;

import java.io.ByteArrayOutputStream;
import java.io.File;

public class ConvertFontFile {
    public static void main(String[] args) throws Exception {

        EOTWriter conv = new EOTWriter(true);
        FontFactory fontfac = FontFactory.getInstance();

        // 遍历目录下font文件夹 获取所有的字体文件
        File[] files = new File("./fonts").listFiles((dir, filename) -> filename.endsWith(".ttf"));

        for (File file : files) {
            if (file.isDirectory()) {
                continue;
            }

            String newPath = "./font-objects/" + file.getName().replace(".ttf", ".eot");

            if (new File(newPath).exists()) {
                continue;
            }

            System.out.println("Converting " + file.getName());
            ByteArrayOutputStream bos = new ByteArrayOutputStream(200000);
            FileInputStream fis = new FileInputStream(file.getPath());

            Font[] fonts = fontfac.loadFonts(fis);

            for (Font font : fonts) {
                bos.reset();
                conv.convert(font).copyTo(bos);

                FileOutputStream fos = new FileOutputStream(newPath);
                fos.write(bos.toByteArray());
                fos.close();
            }

            fis.close();
            bos.close();
        }
    }

}
