import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { TRPCError } from "@trpc/server";

export const chatgptRouter = router({
  /**
   * Chat with ChatGPT
   * Sends a message and gets a response from GPT
   */
  chat: publicProcedure
    .input(
      z.object({
        message: z.string().min(1).max(4000),
        conversationHistory: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          )
          .optional()
          .default([]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Build messages array with conversation history
        const messages = [
          {
            role: "system" as const,
            content:
              "You are a helpful assistant for a file converter application. Help users with file conversion questions, provide tips on image and document formats, and answer questions about the service.",
          },
          ...input.conversationHistory,
          {
            role: "user" as const,
            content: input.message,
          },
        ];

        // Call OpenAI API
        const response = await invokeLLM({
          messages,
        });

        if (!response.choices || response.choices.length === 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No response from ChatGPT",
          });
        }

        const assistantMessage = response.choices[0].message.content;

        return {
          success: true,
          message: assistantMessage,
          usage: response.usage,
        };
      } catch (error: any) {
        console.error("[ChatGPT Error]", error);

        if (error.message?.includes("401")) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid OpenAI API key",
          });
        }

        if (error.message?.includes("429")) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Rate limit exceeded. Please try again later.",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get response from ChatGPT",
        });
      }
    }),

  /**
   * Get file format recommendations
   * Ask ChatGPT for format recommendations based on use case
   */
  getFormatRecommendation: publicProcedure
    .input(
      z.object({
        useCase: z.string().min(1).max(500),
        currentFormat: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const prompt = `As a file format expert, provide a brief recommendation for the following use case:
        
Use Case: ${input.useCase}
${input.currentFormat ? `Current Format: ${input.currentFormat}` : ""}

Provide:
1. Recommended format(s)
2. Why it's the best choice (1-2 sentences)
3. Any important considerations

Keep the response concise and practical.`;

        const response = await invokeLLM({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        if (!response.choices || response.choices.length === 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No response from ChatGPT",
          });
        }

        return {
          success: true,
          recommendation: response.choices[0].message.content,
        };
      } catch (error: any) {
        console.error("[ChatGPT Format Recommendation Error]", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get format recommendation",
        });
      }
    }),

  /**
   * Analyze file conversion request
   * Help users understand what they're trying to do
   */
  analyzeConversionRequest: publicProcedure
    .input(
      z.object({
        sourceFormat: z.string(),
        targetFormat: z.string(),
        description: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const prompt = `Analyze this file conversion request:
        
From: ${input.sourceFormat}
To: ${input.targetFormat}
${input.description ? `Description: ${input.description}` : ""}

Provide:
1. Is this conversion practical? (Yes/No)
2. Quality expectations (brief)
3. Any potential issues to be aware of
4. Tips for best results

Keep it concise and helpful.`;

        const response = await invokeLLM({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        if (!response.choices || response.choices.length === 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No response from ChatGPT",
          });
        }

        return {
          success: true,
          analysis: response.choices[0].message.content,
        };
      } catch (error: any) {
        console.error("[ChatGPT Analysis Error]", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to analyze conversion request",
        });
      }
    }),
});
