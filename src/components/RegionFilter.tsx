const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

interface RegionFilterProps {
  selected: string;
  onSelect: (region: string) => void;
}

export default function RegionFilter({
  selected,
  onSelect,
}: RegionFilterProps) {
  return (
    <div className="mb-6">
      <p id="region-label" className="mb-1 text-sm font-medium">
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
              className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
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