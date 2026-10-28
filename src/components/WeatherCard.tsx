import { useWeather } from "../hooks/useWeather";
import type { CountryDetails } from "../types/country";
import { describeWeather } from "../utils/describeWeather";

interface WeatherCardProps {
  country: CountryDetails;
}

// Vädret i en egen ruta, så resten av sidan funkar även om väder-API:et strular.
export default function WeatherCard({ country }: WeatherCardProps) {
  const { data: weather, isPending, isError, refetch } = useWeather(country);
  const description = weather ? describeWeather(weather.weatherCode) : null;

  return (
    <section
      aria-labelledby="weather-heading"
      className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 id="weather-heading" className="mb-4 text-lg font-semibold text-slate-900">
        Väder just nu{weather ? ` i ${weather.place}` : ""}
      </h2>

      {isPending && (
        <p role="status" className="text-slate-600">
          Laddar väder...
        </p>
      )}

      {isError && (
        <div>
          <p role="alert" className="mb-3 text-red-700">
            Kunde inte hämta vädret.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Försök igen
          </button>
        </div>
      )}

      {weather === null && (
        <p className="text-slate-600">Det finns ingen plats att hämta väder för.</p>
      )}

      {weather && description && (
        <div>
          <div className="mb-4 flex items-center gap-4">
            <span aria-hidden="true" className="text-5xl">
              {description.icon}
            </span>

            <p className="text-4xl font-bold tracking-tight text-slate-900">
              {weather.temperature.toLocaleString("sv-SE")} °C
            </p>
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-t border-slate-100 pt-2">
              <dt className="text-slate-500">Väder</dt>
              <dd className="font-medium text-slate-900">{description.text}</dd>
            </div>

            <div className="flex justify-between gap-4 border-t border-slate-100 pt-2">
              <dt className="text-slate-500">Vind</dt>
              <dd className="font-medium text-slate-900">
                {weather.windSpeed.toLocaleString("sv-SE")} m/s
              </dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
}
