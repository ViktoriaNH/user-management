import { useEffect, useState } from "react";

const usePagination = (items = [], pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const start = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(start, start + pageSize);

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    paginatedItems,
  };
};

export default usePagination;