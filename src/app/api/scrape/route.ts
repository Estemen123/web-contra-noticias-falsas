import { NextResponse } from "next/server";
import * as cheerio from "cheerio"; // Importación corregida

export async function POST(req: Request) {
    try {
        const { query } = await req.json(); // Recibe el texto o palabras clave de la noticia
        if (!query) {
            return NextResponse.json({ error: "No se proporcionó una consulta válida" }, { status: 400 });
        }

        console.log("Consulta recibida:", query);

        // Realiza la búsqueda en DuckDuckGo
        const res = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
        const html = await res.text();

        // Usar cheerio para analizar el HTML
        const $ = cheerio.load(html);
        const links: string[] = []; // Especificar el tipo explícitamente como string[]

        // Seleccionar los enlaces con la clase result__a
        $(".result__a").each((_, element) => {
            const href = $(element).attr("href");
            if (href && href.startsWith("//duckduckgo.com/l/?uddg=")) {
                const decodedLink = decodeURIComponent(href.replace("//duckduckgo.com/l/?uddg=", ""));
                const cleanedLink = decodedLink.split("&")[0]; // Eliminar parámetros adicionales
                links.push(cleanedLink);
            }
        });

        console.log("Enlaces generados:", links);

        // Limitar a los primeros 3 enlaces
        const limitedLinks = links.slice(0, 3);

        // Devolver los enlaces generados
        return NextResponse.json({ links: limitedLinks });
    } catch (err) {
        console.error("Error en el endpoint de búsqueda:", err);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}