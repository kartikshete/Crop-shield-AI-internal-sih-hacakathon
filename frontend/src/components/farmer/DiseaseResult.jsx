import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles, Bug, Leaf } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { formatPercent } from '../../utils/formatters';

export const DiseaseResult = ({ detection, crop, district }) => {
  const { lang, t } = useLanguage();
  if (!detection) return null;

  const { diseaseName, diseaseNameMr, diseaseNameHi, pathogenType, confidence, severity, affectedAreaPercentage } = detection;

  const displayName = lang === 'mr' && diseaseNameMr 
    ? diseaseNameMr 
    : lang === 'hi' && diseaseNameHi 
    ? diseaseNameHi 
    : diseaseName;

  const severityColors = {
    MILD: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    MODERATE: 'bg-amber-100 text-amber-800 border-amber-300',
    SEVERE: 'bg-rose-100 text-rose-800 border-rose-300',
  };

  const isHealthy = diseaseName.toLowerCase().includes('healthy') || diseaseName.toLowerCase().includes('निरोगी');

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-agri-50 text-agri-600 font-bold text-xs flex items-center gap-1.5">
            <Leaf className="w-4 h-4" />
            <span>{crop || 'Cotton'}</span>
          </span>
          {district && (
            <span className="text-xs text-slate-500 font-medium">
              • {district}, Maharashtra
            </span>
          )}
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${severityColors[severity] || severityColors.MODERATE}`}>
          {t('common.severity')}: {severity}
        </span>
      </div>

      <div>
        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
          Identified Pathology
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {displayName}
        </h2>
        {lang !== 'en' && (
          <p className="text-xs text-slate-500 mt-0.5 italic">
            Scientific: {diseaseName} ({pathogenType})
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 font-medium block">
            {t('farmer.confidenceScore')}
          </span>
          <span className="text-lg font-black text-agri-700">
            {formatPercent(confidence)}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 font-medium block">
            Pathogen Family
          </span>
          <span className="text-sm font-bold text-slate-800 line-clamp-1 mt-0.5">
            {pathogenType || 'Fungal'}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 font-medium block">
            Foliage Affected
          </span>
          <span className="text-lg font-black text-amber-600">
            {affectedAreaPercentage || 15}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiseaseResult;
