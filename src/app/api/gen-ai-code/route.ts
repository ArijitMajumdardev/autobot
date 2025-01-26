import { GenAiCode } from "@/configs/AImodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const {prompt} = await req.json();

    console.log(prompt)
    try {
        const result = await GenAiCode.sendMessage(prompt)
        const resp = result.response.text() 

        return NextResponse.json(JSON.parse(resp))
    } catch (error) {
        return NextResponse.json(error)
    }
}