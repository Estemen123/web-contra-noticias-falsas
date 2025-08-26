
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {mesage} = await req.json();
    console.log(mesage);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Tevoy a enviar un link quiero saber si lo que se dice es verdad: " +mesage,
    });
    console.log(response.text)
    return NextResponse.json({ text: response.text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al generar respuesta" }, { status: 500 });
  }
}
