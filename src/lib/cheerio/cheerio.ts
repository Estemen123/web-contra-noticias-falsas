import * as cheerio from "cheerio";

export async function scrapeArticle(url: string): Promise<string> {
  try {
    // Traer el HTML de la página
    const res = await fetch(url);
    const html = await res.text();

    // Cargar en cheerio
    const $ = cheerio.load(html);

    // Seleccionar párrafos comunes de artículos
    const paragraphs: string[] = [];
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text) {
        paragraphs.push(text);
      }
    });

    // Unir todo el texto
    return paragraphs.join(" ");
  } catch (err) {
    console.error("Error scraping:", err);
    return "";
  }
}
