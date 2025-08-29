import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { scrapeArticle } from "@/lib/cheerio/cheerio";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const thePrompt = `
Quiero que intentes acceder únicamente al contenido de la noticia.
Si logras procesarlo, devuélveme únicamente un JSON con esta estructura:

{ summary: "<resumen breve de la noticia o vacío si no existe>",
 "title": "<título de la noticia o vacío si no existe>",
 "veracity": "<0, 25, 50, 75 o 100>",
  "argument": "<explicación breve del nivel de veracidad asignado o vacío si no existe>",
 }

Reglas estrictas:

No inventes ni uses noticias distintas a la del link.

Si no puedes acceder al contenido de la URL, devuelve el JSON con summary: "".

No añadas explicaciones ni comentarios fuera del JSON.

No me añadas las  "\" por ejemplo: \"summary\" no me mandes de esta manera quiero que sea "summary" esto para todos los atributos.

NO coloques este caracter "\", y tampoco hagas salto de linea.
No añadas saltos de linea 

te enviare el contenido:
`;

export async function POST(req: Request) {
    try {
        const { mesage } = await req.json();
        const articleText = await scrapeArticle(mesage);
        console.log(articleText);
        const esta = await geminiRequest(thePrompt + articleText);
        const dataString = await esta.json();
        console.log(dataString);
        const data = JSON.parse(dataString.text);
        console.log(dataString);
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Error al generar respuesta" },
            { status: 500 }
        );
    }
}

const geminiRequest = async (prompt: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return NextResponse.json({ text: response.text });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Error al generar respuesta" },
            { status: 500 }
        );
    }
};
