import React, { useState } from "react";
import NoServiceSelected from "./NoServiceSelected";
import { useJobInventory } from "../context/jobInentoryContext";
import { Table, TableProps } from "antd";
import InventoryModal from "./InventoryModal";

const DataGrid = () => {
  const { activeJobInventory } = useJobInventory();
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const handleRowClick = (record: any) => {
    setSelectedItem(record);
    setUpdateModalVisible(true);
  };

  interface JobInventoryItemType {
    id: string;
    item: string;
    quantity: number;
    description: string;
    notes: string;
  }

  const data: JobInventoryItemType[] = [
    {
      id: "1",
      item: "G5524",
      quantity: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "1",
      item: "G5524",
      quantity: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "1",
      item: "G5524",
      quantity: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const columns: TableProps<JobInventoryItemType>["columns"] = [
    {
      title: "Nr.",
      key: "index",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (text) => <>{text}</>,
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
      render: (text) => <>{text}</>,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (text) => <>{text}</>,
    },
    {
      title: "Notes",
      key: "notes",
      dataIndex: "notes",
      render: (text) => <>{text}</>,
    },
  ];

  if (!activeJobInventory) return <NoServiceSelected />;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {activeJobInventory && (
        <Table
          style={{ width: "100%", height: "100%" }}
          columns={columns}
          dataSource={activeJobInventory}
          rowKey="id"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                handleRowClick(record);
              },
            };
          }}
        />
      )}
      {updateModalVisible && (
        <InventoryModal
          visible={updateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          currentItem={selectedItem}
        />
      )}
    </div>
  );
};

export default DataGrid;
