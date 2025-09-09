import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  page: number;
  setPage: (value: number) => void;
  total: number;
}

const Pagination = ({ page, setPage, total }: Props) => {
  const totalPages = Math.max(0, Math.floor(total || 0));

  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex items-center justify-center lg:justify-end gap-6">
      {page > 1 && (
        <button
          className="cursor-pointer text-black"
          onClick={() => setPage(page - 1)}
        >
          <FiChevronLeft size={20} />
        </button>
      )}

      <div className="flex items-center gap-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`text-lg ${
              page === index + 1
                ? "text-black-400 cursor-default font-medium"
                : "text-black-100 cursor-pointer"
            }`}
            onClick={() => setPage(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {page < totalPages && (
        <button
          className="cursor-pointer text-black"
          onClick={() => setPage(page + 1)}
        >
          <FiChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
