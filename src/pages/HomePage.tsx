
import { useSearchParams } from "react-router";
import CountryCard from "../components/CountryCard";
import SearchField from "../components/SearchField";
import { useCountries } from "../hooks/useCountries";
import RegionFilter from "../components/RegionFilter";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 12;

// Startsidan med alla länder. Sök, region och sida ligger i URL:en så länken går att dela.
export default function HomePage() {
  const {
    data: countries,
    isPending,
    isError,
    refetch,
  } = useCountries();

  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region") ?? "All";
  const query = searchParams.get("query") ?? "";

  const pageParam = Number(searchParams.get("page"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  // Ändrar en sak i URL:en men behåller resten. Nytt sök eller ny region börjar om på sida 1.
  function updateParam(key: string, value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value && value !== "All") {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        if (key !== "page") {
          next.delete("page");
        }

        return next;
      },
      { replace: key === "query" }
    );
  }

  function handleSearch(value: string) {
    updateParam("query", value);
  }

  function handleRegion(value: string) {
    updateParam("region", value);
  }

  // Byter sida och scrollar upp till toppen.
  function handlePage(newPage: number) {
    updateParam("page", newPage > 1 ? String(newPage) : "");
    window.scrollTo(0, 0);
  }

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div role="status" className="flex items-center gap-3 text-slate-600">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent"
          />
          <span>Laddar länder...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p role="alert" className="mb-4 font-medium text-red-700">
            Kunde inte hämta länder.
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

  const filteredCountries = countries.filter((country) => {
    const matchesQuery = country.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesRegion = region === "All" || country.region === region;

    return matchesQuery && matchesRegion;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageCountries = filteredCountries.slice(start, start + PAGE_SIZE);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Utforska världen
        </h1>

        <p className="text-slate-600">
          Upptäck världens {countries.length} länder – sök, filtrera och läs mer om varje land.
        </p>
      </header>

      <section
        aria-label="Sök och filtrera"
        className="mb-8 space-y-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <SearchField value={query} onChange={handleSearch} />

        <RegionFilter selected={region} onSelect={handleRegion} />
      </section>

      {filteredCountries.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          Inga länder matchar dina kriterier
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageCountries.map((country) => (
              <li key={country.alpha3Code}>
                <CountryCard country={country} />
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePage}
          />
        </>
      )}
    </main>
  );
}
