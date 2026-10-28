
import { Link, useLocation } from "react-router";
import type { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
}

interface RegionColor {
  top: string;
  badge: string;
  border: string;
}

// Varje region får en egen färg i skogstemat. Klasserna skrivs ut helt så att Tailwind hittar dem.
const REGION_COLORS: Record<string, RegionColor> = {
  Africa: {
    top: "bg-amber-100",
    badge: "bg-amber-100 text-amber-900",
    border: "border-t-amber-500",
  },
  Americas: {
    top: "bg-lime-100",
    badge: "bg-lime-100 text-lime-900",
    border: "border-t-lime-600",
  },
  Asia: {
    top: "bg-teal-100",
    badge: "bg-teal-100 text-teal-900",
    border: "border-t-teal-600",
  },
  Europe: {
    top: "bg-emerald-100",
    badge: "bg-emerald-100 text-emerald-900",
    border: "border-t-emerald-700",
  },
  Oceania: {
    top: "bg-cyan-100",
    badge: "bg-cyan-100 text-cyan-900",
    border: "border-t-cyan-600",
  },
};

// Polar och Antarctic m.fl. får en neutral färg.
const DEFAULT_COLOR: RegionColor = {
  top: "bg-stone-100",
  badge: "bg-stone-200 text-stone-800",
  border: "border-t-stone-500",
};

// Ett land i listan. Hela kortet är en länk som kommer ihåg var i listan man var.
export default function CountryCard({
  country,
}: CountryCardProps) {
  const location = useLocation();
  const color = REGION_COLORS[country.region] ?? DEFAULT_COLOR;

  return (
    <Link
      to={`/country/${country.alpha3Code}`}
      state={{ from: location.search }}
      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <article
        className={`flex h-full flex-col overflow-hidden rounded-xl border border-t-4 border-slate-200 bg-white shadow-sm transition group-hover:shadow-md ${color.border}`}
      >
        <div className={`flex items-center justify-center py-5 ${color.top}`}>
          <img
            src={country.flags.svg}
            alt={`Flagga för ${country.name}`}
            className="h-12 w-20 object-contain drop-shadow-sm"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h2 className="font-semibold text-slate-900 group-hover:text-emerald-800">
            {country.name}
          </h2>

          <dl className="space-y-1 text-sm">
            <div className="flex gap-1">
              <dt className="text-slate-500">Huvudstad:</dt>
              <dd className="font-medium text-slate-700">
                {country.capital || "Saknas"}
              </dd>
            </div>
          </dl>

          <p className={`mt-auto self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${color.badge}`}>
            {country.region}
          </p>
        </div>
      </article>
    </Link>
  );
}
