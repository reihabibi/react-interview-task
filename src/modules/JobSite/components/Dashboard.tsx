import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useJobs } from "../context/jobSites";

import { Table} from 'antd';
import type { TableProps } from 'antd';

import theme from '../../../theme'


export interface DataType {
  id?: string;
  name: string;
  status: "complete" | "inProgress" | "onHold" | "onRoad";
  categories: string[];
}


interface DashboardPros { }

const Dashboard = () => {

  const { jobs, getJobs, isLoading } = useJobs()
  const data: DataType[] = jobs
  const navigate = useNavigate();

  useEffect(() => {
    getJobs()
  }, []);

  
  // ToDo: make me a component
  const getColorByValue: (value: string) => React.ReactNode = (value) => {
    const colorMap: { [key: string]: string } = {
      'completed': theme.token.colorSuccess,
      'inProgress': theme.token.colorSuccess,
      'onHold': theme.token.colorWarning,
      'onRoad': theme.token.colorError,
    };

    return (
      <div style={{ width: '130px', margin: 'auto', textAlign: 'center', backgroundColor: colorMap[value], color: 'white', padding: '8px', borderRadius: '8px' }}>
        {value.split(/(?=[A-Z])/) // Split at uppercase letters
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(" ")}
      </div>
    );
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Jobsite Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record) => <a onClick={() => navigate(`/job-inventory/${record.id}`)}>{text}</a>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (status) => (
        getColorByValue(status)
      )
    },
  ];

  return (
    <Table className="tableStrips" dataSource={data.map((item) => ({ ...item, key: item.id }))} style={{ marginTop: '16px', textAlign: 'center'}} loading={isLoading} columns={columns}  />
  )
}

export default Dashboard