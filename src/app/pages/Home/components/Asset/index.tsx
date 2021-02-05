import React from 'react';

type AssetTypes = {
  title: string;
  balance: number | string;
};

const Asset: React.FC<AssetTypes> = ({ title, balance }) => {
  return (
    <div className='flex justify-between items-center border border-gray-300 p-3 mb-5'>
      <div className='flex flex-col'>
        <span className='uppercase'>{title}</span>
        <span className='text-sm'>{balance}</span>
      </div>

      <div>
        <i className='fas fa-sort-amount-up-alt'></i>
      </div>
    </div>
  );
};

export default Asset;
