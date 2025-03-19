import { chatSession } from "@/configs/AImodel";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  console.log(prompt);
  try {
    const result = await chatSession.sendMessage(prompt);
    const AIresp = result.response.text();

    return NextResponse.json({ result: AIresp });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
