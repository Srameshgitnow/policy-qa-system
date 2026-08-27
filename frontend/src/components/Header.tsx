import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg" aria-labelledby="site-title">
      <div className="container py-6">
        <h1 id="site-title" className="text-3xl font-bold">Policy Q&A System</h1>
        <p className="text-blue-100 mt-2">
          Explore public UK policy information and get clear, source-cited answers
        </p>
      </div>
    </header>
  );
};
