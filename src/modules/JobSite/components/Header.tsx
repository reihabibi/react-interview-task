import React, { useEffect, useState } from "react";
import { useJobs } from "../context/jobSites";
import InfoText from "../../../components/ui/InfoText";

import { Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import theme from '../../../theme'

interface headerProps {
  openModal: any;
}

const Header = ({ openModal }: headerProps) => {
  const { getJobs, searchJobsByName } = useJobs();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue === '') {
      getJobs()
      return
    }
    searchJobsByName(searchValue);
  }, [searchValue]);

  return (
    <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <InfoText
        type="info"
        text="Informative piece of text that can be used regarding this modal."
      />
      <div style={{ display: 'flex', gap: '20px' }}>
        <Input
          allowClear
          style={{ flexGrow: 1, width: '492px' }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search a driver"
          prefix={<SearchOutlined style={{ color: 'inherit', opacity: '0.3' }} />}
        />
        <Button type="primary" onClick={openModal} icon={<PlusOutlined />} iconPosition={'end'} style={{ backgroundColor: theme.token.colorSuccess }}>
          Create New
        </Button>
      </div>
    </div>
  );
};

export default Header;
