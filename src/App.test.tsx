/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import React from "react";

const mockData = Array.from({ length: 10 }, (_, index) => ({
  "s.no": index + 1,
  "percentage.funded": 50 + index * 5,
  "amt.pledged": 1000 + index * 100,
  name: `Project ${index + 1}`,
}));

describe("App Component", () => {
  const mockPushState = jest.fn();

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    // Mock window.history.pushState
    const originalPushState = window.history.pushState;
    window.history.pushState = mockPushState;

    // Mock URL
    delete (window as any).location;
    window.location = new URL("http://localhost") as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  it("renders header correctly", () => {
    render(<App />);
    expect(screen.getByText("Project Explorer")).toBeInTheDocument();
    expect(screen.getByText("Created by Sushil Kamble")).toBeInTheDocument();
  });

  it("shows and hides loading state correctly", async () => {
    render(<App />);

    // Check initial loading state
    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it("updates URL when changing pages", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Wait for data to load and table to render
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    // Ensure we have records that span multiple pages
    const recordsPerPage = 5; // Same as in your App component
    expect(mockData.length).toBeGreaterThan(recordsPerPage);

    // Find next button and ensure it exists
    const nextButton = await screen.findByRole("button", { name: /next/i });
    expect(nextButton).toBeEnabled();

    // Click the next button and wait for the state to update
    await user.click(nextButton);

    // Wait for URL update
    await waitFor(() => {
      expect(mockPushState).toHaveBeenCalledTimes(2);
      expect(mockPushState).toHaveBeenCalledWith(
        {},
        "",
        expect.stringContaining("page=2")
      );
    });
  });

  it("disables pagination buttons appropriately", async () => {
    const user = userEvent.setup();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    // Check initial state
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();

    // Go to next page
    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    // Verify previous button is now enabled
    await waitFor(() => {
      expect(prevButton).toBeEnabled();
    });
  });

  // Add this test to verify the records per page functionality
  it("displays correct number of records per page", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    // Get all table rows (excluding header row)
    const rows = screen.getAllByRole("row").slice(1);
    expect(rows).toHaveLength(5); // Default records per page

    // Verify first and last record on first page
    expect(rows[0]).toHaveTextContent("150%$1000");
    expect(rows[4]).toHaveTextContent("570%$1400");
  });
});
