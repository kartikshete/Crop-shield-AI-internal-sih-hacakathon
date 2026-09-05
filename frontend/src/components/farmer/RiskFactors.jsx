import React from 'react';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export const RiskFactors = ({ factors = [] }) => {
  if (!factors || factors.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Primary Environmental Outbreak Drivers:
      </h4>

      <ul className="space-y-2">
        {factors.map((factor, idx) => (
          <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{factor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskFactors;
