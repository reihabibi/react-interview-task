import React, { useState } from "react";

import { Card } from "antd";

import Header from "../modules/JobSite/components/Header";
import Dashboard from "../modules/JobSite/components/Dashboard";
import JobStatus from "../modules/JobSite/components/JobStatus";
import NewJobModal from "../modules/JobSite/components/NewJobModal";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <JobStatus />
      <Card size="small" title={'Title'} style={{ marginTop: '10px' }} styles={{ header: { backgroundColor: '#F8F8FA' }}} >
        <Header openModal={openModal} />
        <Dashboard />
      </Card>
      <NewJobModal visible={modalVisible} onClose={closeModal} />
    </div>
  );
};

export default Home;
