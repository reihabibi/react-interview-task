import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useJobInventory } from "../context/jobInentoryContext";

import { Button, Card, Space } from "antd";
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";

import theme from "../../../theme";

const LeftCard = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const { getJobsInventory, searchJobInventoryById, jobInventory, activeCategoryId, setActiveCategoryId } =
    useJobInventory();

  useEffect(() => {
    getJobsInventory();

    if (jobId) {
      searchJobInventoryById(jobId);
    }
  }, []);



  return (
    <Space direction="vertical" size={16}>
      <Card
        size="small"
        title={jobInventory && jobInventory.jobName}
        style={{ width: 347, minHeight: 500 }}
        styles={{ header: { backgroundColor: '#F8F8FA' }}}
      >
        <Space direction="vertical" style={{ width: "100%", minHeight: '500px', justifyContent: 'space-between' }}>
          <div>
            {jobInventory &&
              jobInventory.categories.map((category: object, index: number) => (
                <Button
                  key={index}
                  style={{
                    width: "100%", border: 'none', 
                    color:
                      activeCategoryId === Object.keys(category)[0] ? 'white' : 'initial', 
                    backgroundColor:
                      activeCategoryId === Object.keys(category)[0] ? theme.token.colorSuccess : "#F8F8FA", 
                    marginBottom: '12px',
                  }}
                  icon={activeCategoryId === Object.keys(category)[0] && <CheckOutlined />}
                  iconPosition={"end"}
                  onClick={() => setActiveCategoryId(Object.keys(category)[0])}
                >
                  {Object.keys(category)[0]
                    .split(/(?=[A-Z])/) // Split at uppercase letters
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                    .join(" ")}
                </Button>
              ))}
          </div>
          <Button
            style={{ display: "flex", width: "fit-content", margin: "auto" }}
            type="primary"
            icon={<ArrowLeftOutlined />}
            iconPosition={"end"}
            onClick={() => navigate("/")}
          >
            Go Back
          </Button>
        </Space>
      </Card>
    </Space>
  );
};

export default LeftCard;
