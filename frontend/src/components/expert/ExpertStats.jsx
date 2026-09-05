import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, AlertOctagon, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ExpertStats = ({ cases = [] }) => {
  const { t } = useLanguage();

  const total = cases.length;
  const pending = cases.filter(c => c.status === 'PENDING_REVIEW').length;
  const verified = cases.filter(c => c.status === 'VERIFIED').length;
  const retake = cases.filter(c => c.status === 'RETAKE_REQUESTED').length;
  const highRisk = cases.filter(c => c.riskAssessment?.riskLevel === 'HIGH').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pending Triage</span>
          <span className="text-xl font-black text-amber-600">{pending}</span>
        </div>
      </div>

      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Verified</span>
          <span className="text-xl font-black text-emerald-600">{verified}</span>
        </div>
      </div>

      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">High Outbreak Risk</span>
          <span className="text-xl font-black text-rose-600">{highRisk}</span>
        </div>
      </div>

      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
          <RefreshCw className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Retake Requested</span>
          <span className="text-xl font-black text-purple-600">{retake}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpertStats;
