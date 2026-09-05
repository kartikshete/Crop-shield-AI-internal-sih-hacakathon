import React from 'react';
import { Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const RiskForecast = ({ timeline = [] }) => {
  const { t } = useLanguage();
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-agri-50 text-agri-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t('farmer.forecastTitle')}
            </h3>
            <p className="text-xs text-slate-500">
              Predicting disease movement 3 to 7 days in advance
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Timeline for Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 overflow-x-auto pb-2">
        {timeline.map((item, idx) => {
          const isHigh = item.level === 'HIGH' || item.riskScore >= 70;
          const isModerate = item.level === 'MODERATE' || (item.riskScore >= 40 && item.riskScore < 70);

          return (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex flex-col justify-between text-center transition-all ${
                isHigh
                  ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                  : isModerate
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {item.date || `Day ${item.day}`}
                </span>
                <span className="text-lg font-black block mt-0.5">
                  {item.riskScore}%
                </span>
                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold mt-1 ${
                  isHigh ? 'bg-rose-200 text-rose-800' : isModerate ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'
                }`}>
                  {item.level}
                </span>
              </div>

              <p className="text-[10px] text-slate-600 mt-2 line-clamp-2 leading-tight">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskForecast;
