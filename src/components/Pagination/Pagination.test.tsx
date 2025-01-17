import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { SortColumn, SortDirection } from "../../types";

describe("Pagination Component", () => {
  const defaultProps = {
    totalRecords: 100,
    recordsPerPage: 5,
    currentPage: 1,
    paginate: jest.fn(),
    setRecordsPerPage: jest.fn(),
    sortColumn: "name" as SortColumn,
    sortDirection: "asc" as SortDirection,
  };

  beforeEach(() => {
    // Mock URL manipulation
    window.location = new URL("http://localhost") as any;
  });

  it("renders pagination information correctly", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
    expect(screen.getByText(/of 20/)).toBeInTheDocument();
    expect(screen.getByText(/Showing 5 records/)).toBeInTheDocument();
  });

  it("disables Previous and First buttons on first page", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("First")).toBeDisabled();
  });

  it("disables Next and Last buttons on last page", () => {
    render(<Pagination {...defaultProps} currentPage={20} />);
    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("Last")).toBeDisabled();
  });

  it("calls paginate with correct page number when navigation buttons are clicked", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    fireEvent.click(screen.getByText("Next"));
    expect(defaultProps.paginate).toHaveBeenCalledWith(11);

    fireEvent.click(screen.getByText("Previous"));
    expect(defaultProps.paginate).toHaveBeenCalledWith(9);

    fireEvent.click(screen.getByText("First"));
    expect(defaultProps.paginate).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Last"));
    expect(defaultProps.paginate).toHaveBeenCalledWith(20);
  });

  it("updates records per page when dropdown value changes", () => {
    render(<Pagination {...defaultProps} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "20" } });

    expect(defaultProps.setRecordsPerPage).toHaveBeenCalledWith(20);
    expect(defaultProps.paginate).toHaveBeenCalledWith(1);
  });
});
