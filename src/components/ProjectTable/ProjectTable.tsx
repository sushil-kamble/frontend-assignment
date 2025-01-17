import React, { useMemo } from "react";
import { Project, SortColumn, SortDirection } from "../../types/index";
import ProjectTableLoader from "./ProjectTableLoader.tsx";
import styles from "./ProjectTable.module.css";

interface ProjectTableProps {
  records: Project[];
  recordsPerPage: number;
  handleSort: (column: SortColumn) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  isLoading?: boolean;
}

const TableRow = React.memo(({ record }: { record: Project }) => (
  <tr>
    <td>{record["s.no"]}</td>
    <td>{record["percentage.funded"]}%</td>
    <td>${record["amt.pledged"]}</td>
  </tr>
));

const EmptyRow = React.memo(() => (
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
));

const ProjectTable: React.FC<ProjectTableProps> = ({
  records,
  recordsPerPage,
  handleSort,
  sortColumn,
  sortDirection,
  isLoading = false,
}) => {
  const getSortIcon = useMemo(
    () => (column: SortColumn) => {
      if (sortColumn !== column) return "↕️";
      return sortDirection === "asc" ? "↑" : "↓";
    },
    [sortColumn, sortDirection]
  );

  const emptyRows = recordsPerPage - records.length;
  const emptyRowsArray = useMemo(
    () => Array.from({ length: emptyRows }),
    [emptyRows]
  );

  if (isLoading) {
    return <ProjectTableLoader rowsCount={recordsPerPage} />;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("s.no")}
              style={{ cursor: "pointer" }}
            >
              S.No {getSortIcon("s.no")}
            </th>
            <th
              onClick={() => handleSort("percentage.funded")}
              style={{ cursor: "pointer" }}
            >
              Percentage Funded {getSortIcon("percentage.funded")}
            </th>
            <th
              onClick={() => handleSort("amt.pledged")}
              style={{ cursor: "pointer" }}
            >
              Amount Pledged {getSortIcon("amt.pledged")}
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <TableRow key={record["s.no"]} record={record} />
          ))}
          {emptyRowsArray.map((_, index) => (
            <EmptyRow key={`empty-${index}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ProjectTable);
