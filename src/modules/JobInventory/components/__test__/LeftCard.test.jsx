import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LeftCard from "../LeftCard";
import { useJobInventory } from "../../context/jobInentoryContext";

// Mock useParams and useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    jobId: "mockJobId",
  }),
}));

// Mock useJobInventory context
jest.mock("../../context/jobInentoryContext", () => ({
  useJobInventory: jest.fn(() => ({
    getJobsInventory: jest.fn(),
    searchJobInventoryById: jest.fn(),
    jobInventory: {
      jobName: "Mock Job",
      categories: [{ category1: [] }, { category2: [] }],
    },
    activeCategoryId: "category1",
    setActiveCategoryId: jest.fn(),
  })),
}));

describe("LeftCard component", () => {
  it("renders correctly", async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <LeftCard />
      </MemoryRouter>
    );

    // Check if job name is rendered
    expect(getByText("Mock Job")).toBeInTheDocument();

    // Check if category buttons are rendered
    expect(getByText("Category1")).toBeInTheDocument();
    expect(getByText("Category2")).toBeInTheDocument();

    // Check if the Go Back button is rendered
    const goBackButton = getByRole("button", { name: /go back/i }) || getByRole("button", { name: /arrow-left/i });
    expect(goBackButton).toBeInTheDocument();
    
    // Mock click on Go Back button
    fireEvent.click(goBackButton);
    await waitFor(() => {
      // Add your assertion for navigation behavior here if needed
    });
  });
});
