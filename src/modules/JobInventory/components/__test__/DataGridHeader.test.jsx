import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DataGridHeader from "../DataGridHeader";

// Mock the antd Button component
jest.mock("antd", () => ({
  Button: jest.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

// Mock the jobInventoryContext
jest.mock("../../context/jobInentoryContext", () => ({
  useJobInventory: jest.fn(() => ({
    activeJobInventory: true,
    activeCategoryId: "someCategoryId",
  })),
}));

describe("DataGridHeader component", () => {
  it("renders correctly when activeJobInventory is true", () => {
    const openModal = jest.fn();
    const { getByText } = render(<DataGridHeader openModal={openModal} />);
    expect(getByText("Create New")).toBeInTheDocument();
  });

  it("renders correctly when activeJobInventory is false", () => {
    // Mocking the context to return false for activeJobInventory
    jest.spyOn(require("../../context/jobInentoryContext"), "useJobInventory").mockImplementationOnce(() => ({
      activeJobInventory: false,
      activeCategoryId: "someCategoryId",
    }));

    const openModal = jest.fn();
    const { queryByText } = render(<DataGridHeader openModal={openModal} />);
    expect(queryByText("Create New")).toBeNull();
  });

  it("calls openModal function when button is clicked", () => {
    const openModal = jest.fn();
    const { getByText } = render(<DataGridHeader openModal={openModal} />);
    fireEvent.click(getByText("Create New"));
    expect(openModal).toHaveBeenCalledTimes(1);
  });
});
