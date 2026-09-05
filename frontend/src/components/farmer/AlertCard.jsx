import React from 'react';
import { AlertCircle, AlertTriangle, Bell, Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { formatDate } from '../../utils/formatters';

export const AlertCard = ({ alert, onAcknowledge = null }) => {
  const { lang } = useLanguage();
  if (!alert) return null;

  const { title, titleMr, titleHi, message, messageMr, district, crop, severity, issuedAt, actionRequired, actionRequiredMr } = alert;

  const displayTitle = lang === 'mr' && titleMr ? titleMr : lang === 'hi' && titleHi ? titleHi : title;
  const displayMsg = lang === 'mr' && messageMr ? messageMr : message;
  const displayAction = lang === 'mr' && actionRequiredMr ? actionRequiredMr : actionRequired;

  const isCritical = severity === 'CRITICAL';

  return (
    <div className={`p-5 rounded-3xl border transition-all shadow-card ${
      isCritical
        ? 'bg-rose-50/90 border-rose-200 text-rose-950'
        : 'bg-amber-50/90 border-amber-200 text-amber-950'
    }`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className={`p-2 rounded-xl ${
            isCritical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
          }`}>
            <Bell className="w-4 h-4" />
          </span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              {district} • {crop} Biosecurity Alert
            </span>
            <h4 className="text-sm font-extrabold">{displayTitle}</h4>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
          isCritical ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-900'
        }`}>
          {severity}
        </span>
      </div>

      <p className="text-xs opacity-90 leading-relaxed mb-3">
        {displayMsg}
      </p>

      {displayAction && (
        <div className="p-3 rounded-2xl bg-white/90 border border-slate-200/60 text-xs text-slate-800 space-y-1">
          <span className="font-bold text-slate-900 block">Recommended Farmer Action:</span>
          <p className="leading-relaxed">{displayAction}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-2 text-[10px] opacity-70">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Issued: {formatDate(issuedAt, lang)}</span>
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
