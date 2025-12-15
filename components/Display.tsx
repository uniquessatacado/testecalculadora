import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="w-full bg-gray-900 text-white text-right p-4 rounded-lg mb-4 shadow-inner">
      <div className="h-16 flex items-center justify-end overflow-hidden">
        <span className="text-4xl font-mono tracking-wider truncate">
          {value}
        </span>
      </div>
    </div>
  );
};

export default Display;