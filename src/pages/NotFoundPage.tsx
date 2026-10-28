import { Link } from "react-router";

// Visas när adressen inte finns.
export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="mb-2 text-6xl font-extrabold tracking-tight text-emerald-700">404</p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">Sidan hittades inte</h1>

        <p className="mb-8 text-slate-600">
          Adressen du försökte nå finns inte. Kanske har du skrivit fel?
        </p>

        <Link
          to="/"
          className="inline-block rounded-lg bg-emerald-700 px-5 py-2.5 font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Till startsidan
        </Link>
      </div>
    </main>
  );
}
