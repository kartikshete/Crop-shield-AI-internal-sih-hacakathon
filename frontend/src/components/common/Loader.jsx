import React from 'react';
import { Sprout } from 'lucide-react';

export const Loader = ({
  text = 'Analyzing crop health...',
  size = 'md', // sm | md | lg
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="relative mb-4">
        {/* Pulsing halo */}
        <div className="absolute inset-0 rounded-full bg-agri-400/30 animate-ping" />
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center text-white shadow-lg shadow-agri-600/30 animate-bounce">
          <Sprout className="w-8 h-8" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-800">{text}</p>
      <p className="text-xs text-slate-400 mt-1">Applying Vision AI & microclimate risk algorithms</p>
    </div>
  );
};

export default Loader;
