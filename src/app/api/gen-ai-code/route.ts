import { NextRequest } from "next/server";
import { GenAiCode } from "@/configs/AImodel";

export const runtime = "edge";
export const maxDuration = 60; // Increase timeout for large code generation

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await GenAiCode.sendMessageStream(prompt);

        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }

        controller.close();
      } catch (err: any) {
        console.error("Stream error:", err);
        // Send error as JSON so client can handle it
        const errorMessage = JSON.stringify({
          error: true,
          message: err.message || "Failed to generate code"
        });
        controller.enqueue(encoder.encode(errorMessage));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}
