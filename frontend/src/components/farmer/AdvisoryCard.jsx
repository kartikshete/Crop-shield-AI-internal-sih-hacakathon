import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  Layers, 
  Sparkles, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  AlertOctagon 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdvisoryCard = ({ advisory }) => {
  const { t } = useLanguage();
  const [openTab, setOpenTab] = useState('cultural'); // cultural | mechanical | biological | chemical

  if (!advisory) return null;

  const { cultural = [], mechanical = [], biological = [], chemical = {} } = advisory;

  const tabs = [
    { id: 'cultural', title: t('farmer.cultural'), icon: Trash2, count: cultural.length },
    { id: 'mechanical', title: t('farmer.mechanical'), icon: Layers, count: mechanical.length },
    { id: 'biological', title: t('farmer.biological'), icon: Sparkles, count: biological.length },
    { id: 'chemical', title: t('farmer.chemical'), icon: Flame, isAlert: chemical.warranted },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      {/* Header with Safety Rule Principle */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-agri-100 text-agri-700">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              {t('farmer.ipmTitle')}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Prioritize low-cost agronomic sanitation and biocontrols. Do not jump to chemical sprays.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
          IPM Protocol
        </span>
      </div>

      {/* Safety Alert Banner */}
      <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          {t('farmer.ipmNotice')}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = openTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setOpenTab(tab.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                active
                  ? 'bg-agri-600 text-white border-agri-600 shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                {tab.isAlert && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </div>
              <span className="text-xs font-bold leading-tight line-clamp-1">{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Content panel according to active tab */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 min-h-[140px] animate-fadeIn">
        {openTab === 'cultural' && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Field Sanitation & Agronomic Practices
            </h4>
            <ul className="space-y-2">
              {cultural.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-agri-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {openTab === 'mechanical' && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Traps & Vector Interception
            </h4>
            <ul className="space-y-2">
              {mechanical.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {openTab === 'biological' && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Organic Biocontrols & Botanical Extracts
            </h4>
            <ul className="space-y-2">
              {biological.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {openTab === 'chemical' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Regulated Chemical Guidance (Strictly Gated)
              </h4>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                chemical.warranted ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {chemical.warranted ? 'Economic Threshold Exceeded' : 'Chemical Spray NOT Recommended'}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {chemical.advisoryNote}
            </p>

            {chemical.contingency && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <span>CIBRC Agronomic Recommendation:</span>
                </div>
                <p className="leading-relaxed pl-5">{chemical.contingency}</p>
                <p className="text-[10px] text-rose-700 pl-5 font-semibold">
                  ⚠️ Mandatory PPE: Use protective mask, nitrile gloves, and observe pre-harvest interval (PHI).
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvisoryCard;
