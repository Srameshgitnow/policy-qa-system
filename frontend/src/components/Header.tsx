import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container py-6">
        <h1 className="text-3xl font-bold">Policy Q&A System</h1>
        <p className="text-blue-100 mt-2">
          Ask questions about UK government policies and get accurate, cited answers
        </p>
      </div>
    </header>
  );
};
