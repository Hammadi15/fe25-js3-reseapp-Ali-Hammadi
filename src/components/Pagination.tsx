interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const buttonClass =
    "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white";

  return (
    <nav
      aria-label="Sidnavigering"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        className={buttonClass}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Föregående
      </button>

      <p aria-live="polite" className="text-sm">
        Sida {currentPage} av {totalPages}
      </p>

      <button
        type="button"
        className={buttonClass}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Nästa
      </button>
    </nav>
  );
}