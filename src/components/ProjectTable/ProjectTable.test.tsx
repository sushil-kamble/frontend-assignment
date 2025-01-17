import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectTable from "./ProjectTable";
import { Project, SortColumn, SortDirection } from "../../types";

describe("ProjectTable Component", () => {
  const defaultProps = {
    records: [
      { "s.no": 1, "percentage.funded": 50, "amt.pledged": 1000 },
      { "s.no": 2, "percentage.funded": 75, "amt.pledged": 1500 },
    ] as Project[],
    recordsPerPage: 5,
    handleSort: jest.fn(),
    sortColumn: "s.no" as SortColumn,
    sortDirection: "asc" as SortDirection,
  };

  it("renders table headers correctly", () => {
    render(<ProjectTable {...defaultProps} />);
    expect(screen.getByText(/S.No/)).toBeInTheDocument();
    expect(screen.getByText(/Percentage Funded/)).toBeInTheDocument();
    expect(screen.getByText(/Amount Pledged/)).toBeInTheDocument();
  });

  it("renders table records correctly", () => {
    render(<ProjectTable {...defaultProps} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("$1500")).toBeInTheDocument();
  });

  it("renders empty rows correctly", () => {
    render(<ProjectTable {...defaultProps} />);
    expect(
      screen.getAllByText((content, element) => {
        return element?.textContent === "\u00A0";
      }).length
    ).toBe(9); // 3 empty cells per row, 3 empty rows
  });

  it("calls handleSort with correct column when headers are clicked", () => {
    render(<ProjectTable {...defaultProps} />);
    fireEvent.click(screen.getByText(/S.No/));
    expect(defaultProps.handleSort).toHaveBeenCalledWith("s.no");

    fireEvent.click(screen.getByText(/Percentage Funded/));
    expect(defaultProps.handleSort).toHaveBeenCalledWith("percentage.funded");

    fireEvent.click(screen.getByText(/Amount Pledged/));
    expect(defaultProps.handleSort).toHaveBeenCalledWith("amt.pledged");
  });

  it("displays correct sort icons", () => {
    render(<ProjectTable {...defaultProps} />);
    expect(screen.getByText("S.No ↑")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded ↕️")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged ↕️")).toBeInTheDocument();
  });
});
