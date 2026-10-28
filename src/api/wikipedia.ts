import type { WikiSummary } from "../types/wikipedia";

// Svaret från Wikipedia, bara de fält vi behöver.
interface WikiResponse {
  type: string;
  title: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls: { desktop: { page: string } };
}

// Hämtar en kort text och bild om landet från Wikipedia.
// Hittas ingen riktig artikel blir det null.
export async function getWikiSummary(
  countryName: string
): Promise<WikiSummary | null> {
  const title = countryName.replace(/ \(.*\)$/, "");

  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta introtexten");
  }

  const data = (await response.json()) as WikiResponse;

  if (data.type !== "standard") {
    return null;
  }

  return {
    title: data.title,
    extract: data.extract,
    imageUrl: data.thumbnail?.source ?? null,
    articleUrl: data.content_urls.desktop.page,
  };
}