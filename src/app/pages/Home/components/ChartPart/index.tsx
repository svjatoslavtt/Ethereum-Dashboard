import React from 'react';

type ChartPartTypes = {
  color: string;
  title: string;
};

const ChartPart: React.FC<ChartPartTypes> = ({ color, title }) => {
  return (
    <div className='flex items-center mr-2'>
      <div className='w-4 h-4 mr-2' style={{ background: color }}></div>
      <span className='uppercase whitespace-nowrap'>{title}</span>
    </div>
  );
};

export default ChartPart;
