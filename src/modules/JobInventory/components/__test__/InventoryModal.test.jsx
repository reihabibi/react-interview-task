Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useJobInventory } from "../../context/jobInentoryContext";
import InventoryModal from "../InventoryModal";

// Mock useJobInventory context
jest.mock("../../context/jobInentoryContext", () => ({
  useJobInventory: jest.fn(() => ({
    activeCategoryId: "mockCategoryId",
    getJobsInventory: jest.fn(),
    addItemToActiveCategory: jest.fn(),
    updateItemInActiveCategory: jest.fn(),
  })),
}));

describe("InventoryModal component", () => {
  it("renders correctly", async () => {
    const onClose = jest.fn();
    const { getByText, getByLabelText, getByPlaceholderText, getByTestId } =
      render(<InventoryModal visible onClose={onClose} />);

    // Check if the item select and quantity input are rendered
    expect(getByLabelText("Item")).toBeInTheDocument();
    expect(getByPlaceholderText("Set Quantity")).toBeInTheDocument();

    // Check if the description and notes inputs are rendered
    expect(getByLabelText("Description")).toBeInTheDocument();
    expect(getByLabelText("Notes")).toBeInTheDocument();

    // Check if the modal is rendered
    expect(getByTestId("inventory-modal")).toBeInTheDocument();
  });
});
