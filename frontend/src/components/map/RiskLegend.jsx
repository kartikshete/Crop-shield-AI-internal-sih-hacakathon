import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Info, Shield } from 'lucide-react';

export const RiskLegend = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-elevated text-xs space-y-2.5">
      <div className="flex items-center gap-1.5 font-bold text-slate-800">
        <Shield className="w-4 h-4 text-agri-600" />
        <span>{t('map.legendTitle')}</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-600 flex-shrink-0" />
          <span className="font-semibold text-rose-900">{t('map.highRisk')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
          <span className="font-semibold text-amber-900">{t('map.modRisk')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="font-semibold text-emerald-900">{t('map.lowRisk')}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[10px] text-slate-500 leading-tight">
        <Info className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
        <span>Aggregated at Taluka centroid level. No private farm GPS data exposed.</span>
      </div>
    </div>
  );
};

export default RiskLegend;
