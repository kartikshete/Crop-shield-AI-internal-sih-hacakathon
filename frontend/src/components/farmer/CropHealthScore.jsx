import React from 'react';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CropHealthScore = ({ score = 75, trend = 'STABLE' }) => {
  const { t } = useLanguage();

  const getColor = (s) => {
    if (s >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (s >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getLabel = (s) => {
    if (s >= 80) return 'Vibrant Foliage';
    if (s >= 50) return 'Moderate Stress';
    return 'Severe Pathogen Pressure';
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-agri-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('farmer.cropHealthIndex')}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {score}
          </span>
          <span className="text-xs text-slate-400 font-bold">/ 100</span>
          <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getColor(score)}`}>
            {getLabel(score)}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Calculated via foliage vigor index, lesion ratio, and soil microclimate factors.
        </p>
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-100"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-rose-500'}
            strokeDasharray={`${score}, 100`}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute text-xs font-bold text-slate-800">{score}%</span>
      </div>
    </div>
  );
};

export default CropHealthScore;
