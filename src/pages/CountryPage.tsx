import { Link, useLocation, useParams } from "react-router";
import { useCountry } from "../hooks/useCountry";
import WeatherCard from "../components/WeatherCard";
import WikiIntro from "../components/WikiIntro";

const numberFormatter = new Intl.NumberFormat("sv-SE");

// Detaljsidan för ett land. Tillbaka-knappen tar en till samma sök och sida som innan.
export default function CountryPage() {
  const { code = "" } = useParams();
  const location = useLocation();
  const {
    data: country,
    isPending,
    isError,
    refetch,
  } = useCountry(code.toUpperCase());

  const state = location.state as { from?: string } | null;
  const backLink = `/${state?.from ?? ""}`;

  const backLinkClass =
    "mb-6 inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div role="status" className="flex items-center gap-3 text-slate-600">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent"
          />
          <span>Laddar land...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p role="alert" className="mb-4 font-medium text-red-700">
            Kunde inte hämta landet.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Försök igen
          </button>
        </div>
      </main>
    );
  }

  if (country === null) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-4 text-3xl font-bold tracking-tight">Landet hittades inte</h1>

          <Link
            to={backLink}
            className="font-medium text-emerald-800 underline hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Tillbaka till alla länder
          </Link>
        </div>
      </main>
    );
  }

  const languages =
    country.languages?.map((language) => language.name).join(", ") ||
    "Saknas";
  const currencies =
    country.currencies
      ?.map((currency) => `${currency.name} (${currency.code})`)
      .join(", ") || "Saknas";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link to={backLink} className={backLinkClass}>
        <span aria-hidden="true">←</span> Tillbaka
      </Link>

      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <img
            src={country.flags.svg}
            alt={`Flagga för ${country.name}`}
            className="w-full max-w-60 rounded-lg border border-slate-200 shadow-sm"
          />

          <div>
            <p className="mb-1 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
              {country.region}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {country.name}
            </h1>

            {country.nativeName && (
              <p className="mt-1 text-lg text-slate-600">
                {country.nativeName}
              </p>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-4 sm:px-8">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Region</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {country.region}
              {country.subregion ? ` / ${country.subregion}` : ""}
            </dd>
          </div>

          <div className="bg-white p-4 sm:px-8">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Huvudstad</dt>
            <dd className="mt-1 font-medium text-slate-900">{country.capital || "Saknas"}</dd>
          </div>

          <div className="bg-white p-4 sm:px-8">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Befolkning</dt>
            <dd className="mt-1 font-medium text-slate-900">{numberFormatter.format(country.population)}</dd>
          </div>

          <div className="bg-white p-4 sm:px-8">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Språk</dt>
            <dd className="mt-1 font-medium text-slate-900">{languages}</dd>
          </div>

          <div className="bg-white p-4 sm:px-8 lg:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Valuta</dt>
            <dd className="mt-1 font-medium text-slate-900">{currencies}</dd>
          </div>
        </dl>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <WeatherCard country={country} />

        <div className="lg:col-span-2">
          <WikiIntro countryName={country.name} />
        </div>
      </div>
    </main>
  );
}
