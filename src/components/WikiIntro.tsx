import { useWikiSummary } from "../hooks/useWikiSummary";

interface WikiIntroProps {
  countryName: string;
}

// Introtexten från Wikipedia, också i en egen ruta med eget felmeddelande.
export default function WikiIntro({ countryName }: WikiIntroProps) {
  const { data: summary, isPending, isError, refetch } =
    useWikiSummary(countryName);

  return (
    <section
      aria-labelledby="wiki-heading"
      className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 id="wiki-heading" className="mb-4 text-lg font-semibold text-slate-900">
        Om {countryName}
      </h2>

      {isPending && (
        <p role="status" className="text-slate-600">
          Laddar introtext...
        </p>
      )}

      {isError && (
        <div>
          <p role="alert" className="mb-3 text-red-700">
            Kunde inte hämta introtexten.
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

      {summary === null && (
        <p className="text-slate-600">Det finns ingen Wikipedia-artikel om landet.</p>
      )}

      {summary && (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {summary.imageUrl && (
            <img
              src={summary.imageUrl}
              alt={`Bild från Wikipedia-artikeln om ${summary.title}`}
              className="w-full max-w-48 rounded-lg border border-slate-200"
            />
          )}

          <div>
            <p lang="en" className="mb-4 leading-relaxed text-slate-700">
              {summary.extract}
            </p>

            <p className="text-sm text-slate-500">
              Källa: Wikipedia (CC BY-SA).{" "}
              <a
                href={summary.articleUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-800 underline hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Läs hela artikeln på Wikipedia
                <span className="sr-only"> (öppnas i ny flik)</span>
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
