// src/components/InfoText.tsx
import React from 'react';
import { Typography } from 'antd';
import { ExclamationCircleFilled, InfoCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

import theme from '../../theme';

interface InfoTypeProps {
  text: string;
  type?: 'info' | 'warning' | 'error';
}

const InfoText: React.FC<InfoTypeProps> = ({ text, type = 'info' }) => {
  const iconMap = {
    info: <InfoCircleFilled style={{ color: theme.token.colorPrimary }} data-testid="InfoCircleFilled" />,
    warning: <ExclamationCircleFilled style={{ color: theme.token.colorWarning }} data-testid="ExclamationCircleFilled" />,
    error: <CloseCircleFilled style={{ color: theme.token.colorError }} data-testid="CloseCircleFilled" />,
  };

  return (
    <span>
      {iconMap[type]}
      <Text style={{ marginLeft: 8 }}>{text}</Text>
    </span>
  );
};

export default InfoText;
