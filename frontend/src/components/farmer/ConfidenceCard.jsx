import React from 'react';
import { Award, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';

export const ConfidenceCard = ({ confidence = 0.88 }) => {
  const isHigh = confidence >= 0.80;
  const isModerate = confidence >= 0.60 && confidence < 0.80;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Vision Model Reliability
        </span>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatPercent(confidence)}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            isHigh ? 'bg-emerald-100 text-emerald-800' : isModerate ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {isHigh ? 'High Certainty' : isModerate ? 'Moderate' : 'Low (Routed to Expert)'}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Evaluated via deep CNN pathology weights fine-tuned for Maharashtra field conditions.
        </p>
      </div>

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
        isHigh ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        <Award className="w-8 h-8" />
      </div>
    </div>
  );
};

export default ConfidenceCard;
