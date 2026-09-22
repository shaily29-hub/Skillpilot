package com.skillpilot.backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class ResumeParsingService {

    private final Tika tika = new Tika();

    public String extractText(MultipartFile file) {

        try {

            // TRY TIKA FIRST
            String text;

            try (InputStream inputStream = file.getInputStream()) {
                text = tika.parseToString(inputStream);
            }

            text = cleanText(text);

            // IF TIKA FAILS OR RETURNS TOO LITTLE TEXT
            if (text.length() < 50) {

                System.out.println("Tika extraction weak. Switching to PDFBox...");

                try (PDDocument document = PDDocument.load(file.getInputStream())) {

                    PDFTextStripper pdfStripper = new PDFTextStripper();

                    text = pdfStripper.getText(document);

                    text = cleanText(text);
                }
            }

            return text;

        } catch (Exception e) {
            throw new RuntimeException("Error extracting resume text", e);
        }
    }

    private String cleanText(String text) {

        if (text == null) {
            return "";
        }

        return text
                .replaceAll("\\s+", " ")
                .trim();
    }
}