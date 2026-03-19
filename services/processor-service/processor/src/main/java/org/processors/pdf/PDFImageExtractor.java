package org.processors.pdf;
import org.apache.pdfbox.contentstream.PDFStreamEngine;
import org.apache.pdfbox.contentstream.operator.Operator;
import org.apache.pdfbox.cos.COSBase;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.graphics.PDXObject;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

public class PDFImageExtractor extends PDFStreamEngine {

    private final File OUT_DIR;
    private int imageCounter = 0;

    private int currentPage = 0;

    public PDFImageExtractor(File out){
        this.OUT_DIR = out;
        if(!this.OUT_DIR.exists()) {
            OUT_DIR.mkdirs();
        }
    }

    @Override
    protected void processOperator(Operator operator, List<COSBase> operands) throws IOException{
        if ("Do".equals(operator.getName())) {
            COSName objectName = (COSName) operands.get(0);
            PDXObject xObject = getResources().getXObject(objectName);

            if (xObject instanceof PDImageXObject image) {
                BufferedImage bImage = image.getImage();
                File outFile = new File(
                        OUT_DIR,
                        "pg_" + currentPage + "_img_" + (++imageCounter) + ".png"
                );
                ImageIO.write(bImage, "png", outFile);
                System.out.println("Extracted image: " + outFile.getAbsolutePath());
            }

        }
        super.processOperator(operator, operands);
    }

    /**
     * Extracts images from document and saves them as .png files in obj specified directory
     * @param document
     * @throws IOException
     */
    public void extractImages(PDDocument document) throws IOException {
        int pageNum = 1;
        for (PDPage page : document.getPages()) {
            currentPage = pageNum++;
            processPage(page);
            imageCounter = 0;
        }
    }
}
