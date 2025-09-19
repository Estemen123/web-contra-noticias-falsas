import { NextResponse } from "next/server";
import Tesseract from "tesseract.js";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            console.error("No se proporcionó un archivo.");
            return NextResponse.json({ error: "No se proporcionó un archivo" }, { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        let extractedText = "";

        if (file.type.startsWith("image/")) {
            try {
                console.log("Procesando imagen con OCR...");

                // Configurar rutas absolutas para los archivos necesarios
                const workerPath = path.resolve("./node_modules/tesseract.js/src/worker-script/node/index.js");
                const corePath = path.resolve("./node_modules/tesseract.js-core/tesseract-core.wasm.js");

                const ocrResult = await Tesseract.recognize(fileBuffer, "eng", {
                    workerPath,
                    corePath,
                });

                extractedText = ocrResult.data.text;
                console.log("Texto extraído de la imagen:", extractedText);
            } catch (err) {
                console.error("Error al procesar la imagen con OCR:", err);
                return NextResponse.json({ error: "Error al procesar la imagen con OCR" }, { status: 500 });
            }
        } else {
            console.error("Tipo de archivo no soportado:", file.type);
            return NextResponse.json({ error: "Tipo de archivo no soportado" }, { status: 400 });
        }

        if (!extractedText.trim()) {
            console.error("No se pudo extraer texto de la imagen.");
            return NextResponse.json({ error: "No se pudo extraer texto de la imagen" }, { status: 400 });
        }

        return NextResponse.json({ text: extractedText });
    } catch (err) {
        console.error("Error al procesar el archivo:", err);
        return NextResponse.json({ error: "Error al procesar el archivo" }, { status: 500 });
    }
}