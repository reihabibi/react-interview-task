import React from "react";
import { useJobs } from "../context/jobSites";
import { useJobInventory } from "../../JobInventory/context/jobInentoryContext";
import generateRandomId from "../../../utils/idGenerator";

import type { FormProps } from "antd";
import { Button, Modal, Form, Input, Select, Row, Col, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import InfoText from "../../../components/ui/InfoText";

import theme from "../../../theme";

interface NewJobModalPros {
  visible: boolean;
  onClose: () => void;
}

const NewJobModal = ({ visible, onClose }: NewJobModalPros) => {
  const { createJob } = useJobs();
  const { createJobInventory } = useJobInventory();

  const [form] = Form.useForm();

  type FieldType = {
    id: string;
    name: string;
    categories: string[];
    status: "complete" | "inProgress" | "onHold" | "onRoad";
  };

  const handleCancel = async () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    values.id = generateRandomId(8);
    await createJob(values);
    createJobInventory(values);
    form.resetFields();
    onClose();
  };

  // ToDO save me on a data file
  const categoriesOptions = [
    {
      value: "sidewalkShed",
      label: "Sidewalk Shed",
    },
    {
      value: "scaffold",
      label: "Scaffold",
    },
    {
      value: "shoring",
      label: "Shoring",
    },
  ];

  // ToDO save me on a data file
  const statusOptions = [
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "inProgress",
      label: "In Progress",
    },
    {
      value: "onHold",
      label: "On Hold",
    },
  ];

  return (
    <Modal title="Title" open={visible} footer={null} onCancel={handleCancel}>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <InfoText
          type="info"
          text="Informative piece of text that can be used regarding this modal."
        />

        <Form.Item style={{ marginTop: '12px' }} name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder={`Type the jobsite’s name`} />
        </Form.Item>

        <Row gutter={12}>
          <Col span={14}>
            <Form.Item
              name="categories"
              label="Category Included"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                placeholder="Select categories"
                allowClear
                options={categoriesOptions}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select
                placeholder="Select status"
                allowClear
                options={statusOptions}
              ></Select>
            </Form.Item>
          </Col>
        </Row>

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
            danger
            icon={<CloseOutlined />}
            iconPosition={"end"}
            htmlType="button"
            onClick={handleCancel}
            style={{backgroundColor: theme.token.colorError}}
          >
            Cancel Changes
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            iconPosition={"end"}
            htmlType="submit"
            style={{backgroundColor: theme.token.colorSuccess}}
          >
            Save Changes
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default NewJobModal;
