package com.skillpilot.backend.service;
import reactor.util.retry.Retry;
import java.time.Duration;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

    public String generateInterviewQuestions(
            String skills,
            String role,
            int questionCount
    )  {

        try {

            String prompt = """
        Generate %d technical interview questions.

        Skills: %s
        Role: %s

        Return ONLY the questions.
        Number the questions from 1 to %d.
        """.formatted(
                    questionCount,
                    skills,
                    role,
                    questionCount
            );
            Map<String, Object> requestBody = Map.of(
                    "model", "openai/gpt-3.5-turbo",
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )
                    )
            );

            String response = webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .retryWhen(
                            Retry.fixedDelay(3, Duration.ofSeconds(2))
                                    .doBeforeRetry(retrySignal ->
                                            System.out.println(
                                                    "Retrying OpenRouter Question API... Attempt "
                                                            + (retrySignal.totalRetries() + 1)
                                            )
                                    )
                    )
                    .block();

            System.out.println("RAW RESPONSE:");
            System.out.println(response);

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {

            e.printStackTrace();

            return e.getMessage();
        }
    }
    public String generateFeedback(String question, String answer) {

        try {

            String prompt = """
                You are a technical interviewer.

                Question:
                %s

                Candidate Answer:
                %s

                Evaluate the answer.

                Return:
                1. Score out of 10
                2. Strengths
                3. Weaknesses
                4. Correct/improved answer
                5. Final suggestion

                Keep response concise and professional.
                """.formatted(question, answer);

            Map<String, Object> requestBody = Map.of(
                    "model", "openai/gpt-3.5-turbo",
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )
                    )
            );

            String response = webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .retryWhen(
                            Retry.fixedDelay(3, Duration.ofSeconds(2))
                                    .doBeforeRetry(retrySignal ->
                                            System.out.println(
                                                    "Retrying OpenRouter Feedback API... Attempt "
                                                            + (retrySignal.totalRetries() + 1)
                                            )
                                    )
                    )
                    .block();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {

            e.printStackTrace();

            return """
1. Score: 5/10
2. Strengths: Unable to evaluate.
3. Weaknesses: AI service temporarily unavailable.
4. Corrected Answer: Not generated.
5. Final Suggestion: Please retry.
""";
        }
    }
}