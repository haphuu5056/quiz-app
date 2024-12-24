import React from 'react';

const LoadingPic = ({ loadingImg }) => {
  return (
    <div className="loading">
      <img src={loadingImg} alt="Loading.." />
    </div>
  );
};

export default LoadingPic;
