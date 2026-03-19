package org.processors.pdf;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class PDFTextExtractor extends PDFTextStripper {
    private final Map<Integer, StringBuilder> pageText = new LinkedHashMap<>();
    private final File OUT_DIR;
    private File OUT_FILE;

    public PDFTextExtractor(File out) throws IOException{
        super();
        this.OUT_DIR = out;
    }

    @Override
    protected void writeString(String text, List<TextPosition> textpositions) throws IOException{
        int page = getCurrentPageNo();
        pageText.computeIfAbsent(page, p -> new StringBuilder()).append(text);
    }


    public void extractText(PDDocument pdfFile) throws IOException {
        OUT_FILE = new File(OUT_DIR + "/text/out_text.txt");
        OUT_FILE.getParentFile().mkdirs();
        this.getText(pdfFile);

        try (BufferedWriter writer = Files.newBufferedWriter(OUT_FILE.toPath())){
            pageText.entrySet().stream()
                    .sorted(Map.Entry.comparingByKey())
                    .forEach(entry -> {
                        try {
                            writer.write("//PDF_PAGE_NUM=" + entry.getKey() + "//");
                            writer.newLine();
                            writer.write(entry.getValue().toString());
                            writer.newLine();
                            writer.newLine();
                        } catch (IOException e) {
                            throw new UncheckedIOException(e);
                        }
                    });
        }
    }
}
