const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

interface RegionFilterProps {
  selected: string;
  onSelect: (region: string) => void;
}

// Knappar för att välja region. Den valda syns både för ögat och för skärmläsare.
export default function RegionFilter({
  selected,
  onSelect,
}: RegionFilterProps) {
  return (
    <div>
      <p id="region-label" className="mb-1 text-sm font-medium text-slate-700">
        Region
      </p>

      <div
        role="group"
        aria-labelledby="region-label"
        className="flex flex-wrap gap-2"
      >
        {REGIONS.map((region) => {
          const isSelected = region === selected;

          return (
            <button
              key={region}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(region)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                isSelected
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-800"
              }`}
            >
              {region}
            </button>
          );
        })}
      </div>
    </div>
  );
}
