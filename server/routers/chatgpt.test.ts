import { describe, it, expect } from "vitest";
import { invokeLLM } from "../_core/llm";

describe("ChatGPT Integration Test", () => {
  it("should validate OpenAI API key by making a simple API call", async () => {
    try {
      const response = await invokeLLM({
        messages: [
          {
            role: "user",
            content: "Say 'Hello from ChatGPT' in exactly 5 words.",
          },
        ],
      });

      expect(response).toBeDefined();
      expect(response.choices).toBeDefined();
      expect(response.choices.length).toBeGreaterThan(0);
      expect(response.choices[0].message).toBeDefined();
      expect(response.choices[0].message.content).toBeDefined();
      expect(typeof response.choices[0].message.content).toBe("string");
    } catch (error: any) {
      if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
        throw new Error("Invalid OpenAI API key. Please check your credentials.");
      }
      throw error;
    }
  });
});
