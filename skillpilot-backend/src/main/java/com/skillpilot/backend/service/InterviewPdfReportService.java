package com.skillpilot.backend.service;

import com.itextpdf.text.*;
        import com.itextpdf.text.pdf.PdfWriter;
import com.skillpilot.backend.dto.InterviewReportResponse;
import com.skillpilot.backend.model.InterviewAnswer;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class InterviewPdfReportService {

    public byte[] generatePdfReport(
            InterviewReportResponse report
    ) {

        try {

            Document document = new Document();

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);

            document.open();

            // =========================
            // FONTS
            // =========================

            Font titleFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            20
                    );

            Font headingFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            14
                    );

            Font normalFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA,
                            11
                    );

            // =========================
            // TITLE
            // =========================

            Paragraph title =
                    new Paragraph(
                            "SkillPilot Interview Report",
                            titleFont
                    );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(
                    new Paragraph(" ")
            );

            // =========================
            // OVERALL SUMMARY
            // =========================

            document.add(
                    new Paragraph(
                            "Interview Summary",
                            headingFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Total Questions: "
                                    + report.getTotalQuestions(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Total Score: "
                                    + report.getTotalScore()
                                    + "/"
                                    + (report.getTotalQuestions() * 10),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            String.format(
                                    "Average Score: %.1f/10",
                                    report.getAverageScore()
                            ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            // =========================
            // QUESTION-WISE REPORT
            // =========================

            document.add(
                    new Paragraph(
                            "Question-wise Analysis",
                            headingFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            int questionNumber = 1;

            for (InterviewAnswer answer :
                    report.getAnswers()) {

                // Question

                document.add(
                        new Paragraph(
                                "Question "
                                        + questionNumber,
                                headingFont
                        )
                );

                document.add(
                        new Paragraph(
                                answer.getQuestion(),
                                normalFont
                        )
                );

                document.add(
                        new Paragraph(" ")
                );

                // User Answer

                document.add(
                        new Paragraph(
                                "Your Answer:",
                                headingFont
                        )
                );

                document.add(
                        new Paragraph(
                                answer.getAnswer(),
                                normalFont
                        )
                );

                document.add(
                        new Paragraph(" ")
                );

                // Score

                document.add(
                        new Paragraph(
                                "Score: "
                                        + answer.getScore()
                                        + "/10",
                                headingFont
                        )
                );

                document.add(
                        new Paragraph(" ")
                );

                // AI Feedback

                document.add(
                        new Paragraph(
                                "AI Feedback:",
                                headingFont
                        )
                );

                document.add(
                        new Paragraph(
                                answer.getFeedback(),
                                normalFont
                        )
                );

                document.add(
                        new Paragraph(
                                "________________________________________"
                        )
                );

                document.add(
                        new Paragraph(" ")
                );

                questionNumber++;
            }

            document.close();

            return out.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate interview PDF",
                    e
            );
        }
    }
}
