interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

// Sökfältet. Själva filtreringen sker i HomePage.
export default function SearchField({
  value,
  onChange,
}: SearchFieldProps) {
  return (
    <div>
      <label
        htmlFor="country-search"
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        Sök land
      </label>

      <input
        id="country-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="T.ex. Sweden"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:max-w-sm"
      />
    </div>
  );
}
