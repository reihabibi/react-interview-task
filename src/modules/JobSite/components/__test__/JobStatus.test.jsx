Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import JobStatus from "../JobStatus";
import { useJobs } from "../../context/jobSites";

// Mock the useJobs hook
jest.mock("../../context/jobSites");

describe("JobStatus Component", () => {
  const mockJobStatusCounts = [
    { number: 10, label: "Open", color: "green" },
    { number: 5, label: "In Progress", color: "blue" },
    { number: 2, label: "Closed", color: "red" }
  ];

  const mockCountJobsByStatus = jest.fn();

  beforeEach(() => {
    useJobs.mockReturnValue({
      jobStatusCounts: mockJobStatusCounts,
      countJobsByStatus: mockCountJobsByStatus
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with job status counts", () => {
    render(<JobStatus />);

    mockJobStatusCounts.forEach((status, index) => {
      const statistic = screen.getByTestId(`statistic-${index}`);
      expect(statistic).toHaveTextContent(status.label);
      expect(statistic).toHaveTextContent(status.number.toString());
    });
  });

  test("calls countJobsByStatus on mount", () => {
    render(<JobStatus />);
    expect(mockCountJobsByStatus).toHaveBeenCalledTimes(1);
  });
});
