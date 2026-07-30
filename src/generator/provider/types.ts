/**
 * Pluggable LLM provider — Mock now, OpenAI/Claude/Gemini later.
 */
import type { GenerateResult } from "@/types/recipe";

export type LlmProviderId = "mock" | "openai" | "claude" | "gemini";

export type LlmProvider = {
  id: LlmProviderId;
  generateFromPrompt(prompt: string): Promise<GenerateResult> | GenerateResult;
};
