import React from 'react';
import { formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../context/LanguageContext';

export const PredictionList = ({ alternatives = [] }) => {
  const { t } = useLanguage();
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {t('farmer.alternativeDiagnoses')}
      </h3>

      <div className="space-y-2.5">
        {alternatives.map((alt, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">{alt.diseaseName}</span>
              <span className="text-slate-500 font-mono">{formatPercent(alt.confidence)}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-slate-400 transition-all duration-500"
                style={{ width: `${Math.min(100, alt.confidence * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionList;
