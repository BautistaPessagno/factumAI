import { convertToModelMessages, streamText, UIMessage } from "ai";
import { createOllama } from "ollama-ai-provider-v2";

const ollama = createOllama({
  // optional settings, e.g.
  baseURL: "http://localhost:11434/api",
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
// Allow selecting the Ollama model via env; fall back to a small default
const modelName = process.env.OLLAMA_MODEL || "llama3.2:3b";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: ollama(modelName),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
