// components/models/BaseModel.tsx
import React from 'react';

interface BaseModelProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BaseModel = ({ children, className = '', onClick }: BaseModelProps) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BaseModel;
