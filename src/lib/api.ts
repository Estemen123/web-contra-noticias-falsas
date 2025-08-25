import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getGemini=async (noticia:string)=>{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: " dime si lo que te voy a decir es una notica falsa o no " +noticia,
    });
    console.log(response.text);
    return response.text;
};

export {getGemini};