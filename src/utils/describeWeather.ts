// Gör om väderkoden från Open-Meteo till svensk text och en ikon.
export function describeWeather(code: number): { text: string; icon: string } {
  if (code === 0) return { text: "Klart", icon: "☀️" };
  if (code <= 3) return { text: "Molnigt", icon: "⛅" };
  if (code === 45 || code === 48) return { text: "Dimma", icon: "🌫️" };
  if (code >= 51 && code <= 57) return { text: "Duggregn", icon: "🌦️" };
  if (code >= 61 && code <= 67) return { text: "Regn", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { text: "Snö", icon: "❄️" };
  if (code >= 80 && code <= 82) return { text: "Regnskurar", icon: "🌦️" };
  if (code === 85 || code === 86) return { text: "Snöbyar", icon: "🌨️" };
  if (code >= 95) return { text: "Åska", icon: "⛈️" };
  return { text: "Okänt väder", icon: "🌡️" };
}