import React from 'react';

interface SpinnerProps {
  isLoading: boolean;
}

const FullPageSpinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className='loader fixed inset-0 z-50'>
      <div className='wrapper'>
        <div className='circle'></div>
        <div className='line-1'></div>
        <div className='line-2'></div>
        <div className='line-3'></div>
        <div className='line-4'></div>
      </div>
    </div>
  );
};

export default FullPageSpinner;
