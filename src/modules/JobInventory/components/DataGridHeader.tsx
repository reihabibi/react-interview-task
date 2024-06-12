import { Button } from "antd";
import React from "react";
import { useJobInventory } from "../context/jobInentoryContext";

interface DataGridHeaderProps {
  openModal: () => void;
}

const DataGridHeader = ({ openModal }: DataGridHeaderProps) => {
  const { activeJobInventory, activeCategoryId } = useJobInventory();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {activeCategoryId
          ? activeCategoryId
              .split(/(?=[A-Z])/)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : "Data Grid"}
      </div>
      {activeJobInventory && (
        <Button type="primary" onClick={openModal}>
          Create New
        </Button>
      )}
    </div>
  );
};

export default DataGridHeader;
