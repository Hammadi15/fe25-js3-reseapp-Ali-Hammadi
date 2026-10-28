import type { CountryDetails } from "../types/country";
import type { Weather } from "../types/weather";

// Svaret från Open-Meteos ortssökning. results saknas helt om ingen ort hittades.
interface GeocodingResponse {
  results?: { latitude: number; longitude: number }[];
}

// Svaret från Open-Meteos väder-API, bara de fält vi faktiskt använder.
interface ForecastResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

// Letar upp var huvudstaden ligger. Landskoden gör att vi inte hamnar i fel land.
async function getCapitalCoordinates(
  capital: string,
  countryCode: string
): Promise<{ latitude: number; longitude: number } | null> {
  const params = new URLSearchParams({
    name: capital,
    countryCode,
    count: "1",
    language: "sv",
  });
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta huvudstadens position");
  }

  const data = (await response.json()) as GeocodingResponse;
  return data.results?.[0] ?? null;
}

// Hämtar vädret i huvudstaden, eller mitt i landet om huvudstaden inte hittas.
// Blir null om det inte finns någon plats alls.
export async function getWeather(
  country: CountryDetails
): Promise<Weather | null> {
  let latitude = country.latlng?.[0];
  let longitude = country.latlng?.[1];
  let place = country.name;

  if (country.capital) {
    const capital = await getCapitalCoordinates(
      country.capital,
      country.alpha2Code
    );

    if (capital) {
      latitude = capital.latitude;
      longitude = capital.longitude;
      place = country.capital;
    }
  }

  if (latitude === undefined || longitude === undefined) {
    return null;
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,wind_speed_10m,weather_code",
    wind_speed_unit: "ms",
    timezone: "auto",
  });
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta vädret");
  }

  const data = (await response.json()) as ForecastResponse;

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code,
    place,
  };
}