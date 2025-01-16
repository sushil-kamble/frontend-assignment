import React from "react";
import { Project, SortColumn, SortDirection } from "../../types/index";
import styles from "./ProjectTable.module.css";

interface ProjectTableProps {
  records: Project[];
  recordsPerPage: number;
  handleSort: (column: SortColumn) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  records,
  recordsPerPage,
  handleSort,
  sortColumn,
  sortDirection,
}) => {
  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) return "↕️";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const emptyRows = recordsPerPage - records.length;

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
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record["s.no"]}</td>
              <td>{record["percentage.funded"]}%</td>
              <td>${record["amt.pledged"]}</td>
            </tr>
          ))}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <tr key={`empty-${index}`}>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
