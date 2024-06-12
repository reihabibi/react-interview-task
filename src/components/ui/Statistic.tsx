import React from "react";

interface StatisticPros {
  number: number;
  label: string;
  color: string;
  index: number
}

const Statistic = ({ number, label, color, index }: StatisticPros) => {
  const styleProps = {
    backgroundColor: color,
    fontWeight: 600,
    fontSize: '30px',
    padding: '32px',
    textAlign: 'center',
    color: '#fff',
    borderRadius: '10px'
  };

  return (
    <div style={styleProps} data-testid={`statistic-${index}`}>
      {`${number} ${label}`}
    </div>
  );
};

export default Statistic;
