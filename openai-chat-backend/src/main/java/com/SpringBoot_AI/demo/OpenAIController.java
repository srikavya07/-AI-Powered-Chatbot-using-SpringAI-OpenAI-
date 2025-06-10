package com.SpringBoot_AI.demo;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {

    private final OpenAiChatModel chatModel;

    public OpenAIController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @PostMapping
    public ResponseEntity<String> getAnswer(@RequestBody String message) {
        try {
            String response = chatModel.call(message);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error while processing request: " + e.getMessage());
        }
    }
}
