import React, { useEffect } from "react";
import { useJobs } from "../context/jobSites";

import { Row, Col } from "antd";
import Statistic from "../../../components/ui/Statistic";

const JobStatus = () => {

  const { jobStatusCounts, countJobsByStatus } = useJobs();

  useEffect(() => {
    countJobsByStatus();
  }, []);

  return (
    <Row gutter={12} style={{ borderRadius: "10px", padding: "10px", backgroundColor: 'white' }}>
      {jobStatusCounts.map((s, index) => (
        <Col span={8} key={index}>
          <Statistic number={s.number} label={s.label} color={s.color} index={index}/>
        </Col>
      ))}
    </Row>
  );
};

export default JobStatus;
