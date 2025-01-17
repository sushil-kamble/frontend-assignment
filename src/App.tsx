import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Project, SortColumn, SortDirection } from "./types/index";
import ProjectTable from "./components/ProjectTable/ProjectTable.tsx";
import Pagination from "./components/Pagination/Pagination.tsx";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
  const [sortColumn, setSortColumn] = useState<SortColumn>("s.no");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error state before fetching
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );

        if (!response.ok) {
          throw new Error(
            `${response.status}: Failed to fetch data, Please try again later`
          );
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setData([]); // Reset data on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSort = useCallback(
    (column: SortColumn) => {
      if (sortColumn === column) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
      setCurrentPage(1);
      const url = new URL(window.location.href);
      url.searchParams.set("page", "1");
      window.history.pushState({}, "", url.toString());
    },
    [sortColumn]
  );

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const dir = sortDirection === "asc" ? 1 : -1;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      return aValue > bValue ? dir : -dir;
    });
  }, [data, sortColumn, sortDirection]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Project Explorer</h1>
      </header>

      <main className={styles.main}>
        {error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <ProjectTable
              records={currentRecords}
              recordsPerPage={recordsPerPage}
              handleSort={handleSort}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              isLoading={isLoading}
            />
            <Pagination
              totalRecords={data.length}
              recordsPerPage={recordsPerPage}
              currentPage={currentPage}
              paginate={setCurrentPage}
              setRecordsPerPage={setRecordsPerPage}
            />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Created by Sushil Kamble</p>
      </footer>
    </div>
  );
}

export default React.memo(App);
