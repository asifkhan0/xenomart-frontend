import React from 'react';

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className="h-full flex items-center px-5 py-[10rem] m-5 justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg mb-4">{errorMessage}</p>
        <p className="text-gray-600">The page you are looking for might be temporarily unavailable.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
