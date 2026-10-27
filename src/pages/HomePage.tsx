
import { useSearchParams } from "react-router";
import CountryCard from "../components/CountryCard";
import SearchField from "../components/SearchField";
import { useCountries } from "../hooks/useCountries";
import RegionFilter from "../components/RegionFilter";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 12;
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

  // Ändrar en parameter i URL:en och behåller de andra
  function updateParam(key: string, value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value && value !== "All") {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        
        // Ny sökning eller region börjar om på sida 1
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

  
  function handlePage(newPage: number) {
    updateParam("page", newPage > 1 ? String(newPage) : "");
    window.scrollTo(0, 0);
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div role="status" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
          />
          <span>Laddar länder...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p role="alert" className="mb-4 text-red-600">
          Kunde inte hämta länder.
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Försök igen
        </button>
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
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">
          Utforska världen
        </h1>

        <p className="text-gray-600">
          Upptäck världens {countries.length} länder
        </p>
      </header>

      <SearchField value={query} onChange={handleSearch} />
      
      <RegionFilter selected={region} onSelect={handleRegion} />

      {filteredCountries.length === 0 ? (
        <p className="text-gray-600">
          Inga länder matchar dina kriterier
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageCountries.map((country) => (
              <li
                key={country.alpha3Code}
                className="w-full max-w-[260px]"
              >
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
