import React from 'react';
import { ShieldAlert, TrendingUp, TrendingDown, Minus, MapPin, Bug, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DistrictCard = ({ district }) => {
  const { lang, t } = useLanguage();
  if (!district) return null;

  const {
    name,
    nameMr,
    nameHi,
    dominantCrop,
    cropMr,
    cropHi,
    riskLevel,
    riskScore,
    activeCases,
    trend,
    dominantThreat,
    dominantThreatMr,
    recommendedResponse,
    hotspotsCount,
    weather
  } = district;

  const displayName = lang === 'mr' && nameMr ? nameMr : lang === 'hi' && nameHi ? nameHi : name;
  const displayCrop = lang === 'mr' && cropMr ? cropMr : lang === 'hi' && cropHi ? cropHi : dominantCrop;
  const displayThreat = lang === 'mr' && dominantThreatMr ? dominantThreatMr : dominantThreat;

  const isHigh = riskLevel === 'HIGH';
  const isModerate = riskLevel === 'MODERATE';

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-agri-600" />
            <span>Maharashtra Surveillance Region</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {displayName}
          </h3>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-black ${
          isHigh ? 'bg-rose-100 text-rose-800 border border-rose-300' : isModerate ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
        }`}>
          {riskLevel} RISK
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('map.riskScore')}</span>
          <span className={`text-lg font-black ${isHigh ? 'text-rose-600' : isModerate ? 'text-amber-600' : 'text-emerald-600'}`}>
            {riskScore}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('map.activeCases')}</span>
          <span className="text-lg font-black text-slate-800">
            {activeCases}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('map.dominantCrop')}</span>
          <span className="text-xs font-bold text-slate-800 line-clamp-1 mt-1">
            {displayCrop}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('map.trend')}</span>
          <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-800 mt-1">
            {trend === 'RISING' ? (
              <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
            ) : trend === 'DECLINING' ? (
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Minus className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>{trend}</span>
          </div>
        </div>
      </div>

      {/* Dominant Active Pathogen */}
      <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-2.5">
        <Bug className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-rose-950 block">{t('map.dominantThreat')}:</span>
          <span className="text-rose-900 font-semibold">{displayThreat}</span>
        </div>
      </div>

      {/* Recommended Biosecurity Protocol */}
      {recommendedResponse && (
        <div className="p-3.5 rounded-2xl bg-agri-50/60 border border-agri-100 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-agri-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-agri-950 block">Regional Agronomic Advisory:</span>
            <span className="text-agri-900 leading-relaxed">{recommendedResponse}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictCard;
