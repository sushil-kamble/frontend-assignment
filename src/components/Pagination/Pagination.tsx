import React, { useCallback, useMemo } from "react";
import styles from "./Pagination.module.css"; // Import the CSS module

interface PaginationProps {
  totalRecords: number;
  recordsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  setRecordsPerPage: (recordsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  recordsPerPage,
  currentPage,
  paginate,
  setRecordsPerPage,
}) => {
  const updateURLParams = useCallback((page: number, size: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("size", size.toString());
    window.history.pushState({}, "", url.toString());
  }, []);

  const { pageNumbers, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startPage = Math.max(currentPage - 3, 1);
    const endPage = Math.min(currentPage + 3, totalPages);
    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
    return { pageNumbers, totalPages };
  }, [totalRecords, recordsPerPage, currentPage]);

  const handleRecordsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = Number(event.target.value);
      setRecordsPerPage(newSize);
      paginate(1);
      updateURLParams(1, newSize);
    },
    [setRecordsPerPage, paginate, updateURLParams]
  );

  const handlePaginate = useCallback(
    (pageNumber: number) => {
      paginate(pageNumber);
      updateURLParams(pageNumber, recordsPerPage);
    },
    [paginate, updateURLParams, recordsPerPage]
  );

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.paginationMeta}>
        <p className={styles.paginationInfo}>
          Page {currentPage} of {totalPages} | Showing {recordsPerPage} records
          per page
        </p>
        <select
          className={styles.recordsPerPageSelect}
          onChange={handleRecordsPerPageChange}
          value={recordsPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className={styles.paginationContainer}>
        <div className={styles.leftButtons}>
          <button
            onClick={() => handlePaginate(1)}
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            onClick={() => handlePaginate(currentPage - 1)}
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </div>

        <div className={styles.middleButtons}>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePaginate(number)}
              className={`${styles.paginationButton} ${
                currentPage === number ? styles.active : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        <div className={styles.rightButtons}>
          <button
            onClick={() => handlePaginate(currentPage + 1)}
            className={`${styles.paginationButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={() => handlePaginate(totalPages)}
            className={`${styles.paginationButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
