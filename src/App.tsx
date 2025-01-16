import React from "react";
import { useEffect, useState, useMemo } from "react";
import { Project, SortColumn } from "./types/index";
import ProjectTable from "./components/ProjectTable/ProjectTable.tsx";
import Pagination from "./components/Pagination/Pagination.tsx";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
  const [sortColumn, setSortColumn] = useState<
    "s.no" | "percentage.funded" | "amt.pledged"
  >("s.no");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      return aValue > bValue ? multiplier : -multiplier;
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
        <ProjectTable
          records={currentRecords}
          recordsPerPage={recordsPerPage}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <Pagination
          totalRecords={data.length}
          recordsPerPage={recordsPerPage}
          currentPage={currentPage}
          paginate={setCurrentPage}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          setRecordsPerPage={setRecordsPerPage}
        />
      </main>

      <footer className={styles.footer}>
        <p>Created by Sushil Kamble</p>
      </footer>
    </div>
  );
}

export default App;
