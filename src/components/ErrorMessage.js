import React from 'react';

const ErrorMessage = ({ loadingError }) => {
  return (
    <div className="error-message">
      <h2>{loadingError}</h2>
    </div>
  );
};

export default ErrorMessage;
