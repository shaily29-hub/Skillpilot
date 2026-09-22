package com.skillpilot.backend.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.skillpilot.backend.dto.ResumeAnalysisResponse;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfReportService {

    public byte[] generatePdfReport(
            ResumeAnalysisResponse response
    ) {

        try {

            Document document = new Document();

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);

            document.open();

            Font titleFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            20
                    );

            Font normalFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA,
                            12
                    );

            Paragraph title =
                    new Paragraph(
                            "SkillPilot Resume Analysis Report",
                            titleFont
                    );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Email: " + response.getEmail(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Phone: " + response.getPhone(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Best Role: " + response.getBestRole(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Match Score: " + response.getMatchScore() + "%",
                    normalFont
            ));

            document.add(new Paragraph(
                    "ATS Score: " + response.getAtsScore(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Resume Summary:",
                    titleFont
            ));

            document.add(new Paragraph(
                    response.getResumeSummary(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Skills:",
                    titleFont
            ));

            for (String skill : response.getSkills()) {

                document.add(new Paragraph(
                        "- " + skill,
                        normalFont
                ));
            }

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Suggestions:",
                    titleFont
            ));

            for (String suggestion : response.getSuggestions()) {

                document.add(new Paragraph(
                        "- " + suggestion,
                        normalFont
                ));
            }

            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
