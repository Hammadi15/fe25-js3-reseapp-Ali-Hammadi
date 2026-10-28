
import type { Country, CountryDetails } from "../types/country";
const API_URL =
  "https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags,population,area";

// Hämtar alla länder på en gång. Sök, filter och sidor sköts sen i appen.
export async function getCountries(): Promise<Country[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta länder");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Ogiltigt svar från API:et");
  }

  return data as Country[];
}


// Hämtar ett land. Finns inte koden får vi null tillbaka istället för ett fel.
export async function getCountry(
  code: string
): Promise<CountryDetails | null> {
  const response = await fetch(
    `https://countries.dev/alpha/${encodeURIComponent(code)}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta landet");
  }

  return (await response.json()) as CountryDetails;
}