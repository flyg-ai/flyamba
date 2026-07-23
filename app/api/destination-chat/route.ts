import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Anthropic SDK needs the Node.js runtime.
export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: { question?: string; destination?: string; context?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const question = (body?.question ?? "").trim();
  const destination = (body?.destination ?? "").trim().slice(0, 60) || "this destination";
  const context = (body?.context ?? "").trim().slice(0, 400);

  if (!question) return NextResponse.json({ error: "Empty question" }, { status: 400 });
  if (question.length > 500) return NextResponse.json({ error: "Question too long" }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY" }, { status: 500 });

  const system = `You are a helpful travel assistant specializing in ${destination}. Answer questions about flights, weather, attractions, costs, and travel tips for ${destination}. Be concise (2-3 paragraphs max), practical, and friendly. Always mention flight options when relevant. Reply in plain prose only — no Markdown, no headings, no bullet points, no bold/asterisks.${
    context ? `\n\nAdditional page context: ${context}` : ""
  }`;

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 500,
    system,
    messages: [{ role: "user", content: question }],
  });

  const answer = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  return NextResponse.json({ answer });
}
