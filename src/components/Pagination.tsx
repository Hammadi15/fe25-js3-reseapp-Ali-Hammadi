interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Föregående/nästa och vilken sida man är på. Knapparna stängs av i kanterna.
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const buttonClass =
    "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-700";

  return (
    <nav
      aria-label="Sidnavigering"
      className="mt-10 flex items-center justify-between gap-4 sm:justify-center"
    >
      <button
        type="button"
        className={buttonClass}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <span aria-hidden="true">← </span>Föregående
      </button>

      <p aria-live="polite" className="text-sm text-slate-600">
        Sida <span className="font-semibold text-slate-900">{currentPage}</span> av{" "}
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </p>

      <button
        type="button"
        className={buttonClass}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Nästa<span aria-hidden="true"> →</span>
      </button>
    </nav>
  );
}
