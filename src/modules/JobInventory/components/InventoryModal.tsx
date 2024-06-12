import React, { useEffect } from "react";
import { useJobInventory } from "../context/jobInentoryContext";
import generateRandomId from "../../../utils/idGenerator";

import type { FormProps } from "antd";
import { Button, Modal, Form, Input, Select, Row, Col, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";

import theme from "../../../theme";

interface InventoryModalProps {
  visible: boolean;
  onClose: () => void;
  currentItem?: FieldType | null;
}

interface FieldType {
  id: string;
  item: string;
  quantity: number;
  description: string;
  notes: string;
}

const InventoryModal = ({ visible, onClose, currentItem }: InventoryModalProps) => {
  const { activeCategoryId, getJobsInventory, addItemToActiveCategory, updateItemInActiveCategory } = useJobInventory();

  const [form] = Form.useForm();

  useEffect(() => {
    if (currentItem) {
      form.setFieldsValue(currentItem);
    } else {
      form.resetFields();
    }
  }, [currentItem, form]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    if (currentItem) {
      // Update existing item
      await updateItemInActiveCategory(values);
    } else {
      // Create new item
      values.id = generateRandomId(8);
      await addItemToActiveCategory(values);
    }
    getJobsInventory();
    form.resetFields();
    onClose();
  };

  // ToDO save me on a data file
  const itemOptions = [
    {
      value: "G42295",
      label: "G42295",
    },
    {
      value: "M721",
      label: "M721",
    },
    {
      value: "M94796",
      label: "M94796",
    },
    {
      value: "G42295",
      label: "G42295",
    },
    {
      value: "S25907",
      label: "S25907",
    },
    {
      value: "A68446",
      label: "A68446",
    },
    {
      value: "F3786",
      label: "F3786",
    },
    {
      value: "R69895",
      label: "R69895",
    },
    {
      value: "A29259",
      label: "A29259",
    },
  ];


  return (
    <Modal title={currentItem ? "Edit Job" : "Create Job"} open={visible} footer={null} onCancel={handleCancel} width={868} data-testid={'inventory-modal'}>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="id"
          label="id"
          style={{display: 'none'}}
        >
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="item" label="Item" rules={[{ required: true }]}>
              <Select
                placeholder="Search and select Item"
                allowClear
                options={itemOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true }]}
            >
              <Input placeholder={`Set Quantity`} type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder={`Type the description...`} />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder={`Type notes`} />
        </Form.Item>

        <Form.Item>
          <Space
            direction="horizontal"
            style={{
              paddingTop: "48px",
              width: "100%",
              justifyContent: "right",
            }}
          >
            <Button
              type="primary"
              icon={<CheckOutlined />}
              htmlType="submit"
              style={{ backgroundColor: theme.token.colorSuccess }}
            >
              {currentItem ? "Update Job" : "Create Job"} 
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryModal;
