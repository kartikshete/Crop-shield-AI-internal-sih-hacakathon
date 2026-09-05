import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShieldAlert, ArrowRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { formatPercent, formatDate } from '../../utils/formatters';

export const CaseTable = ({ cases = [], onSelectCase = null }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'VERIFIED':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Verified</span>;
      case 'CORRECTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Corrected</span>;
      case 'RETAKE_REQUESTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Retake Needed</span>;
      case 'PENDING_REVIEW':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Pending</span>;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Case ID & Date</th>
              <th className="py-3.5 px-4">Crop / District</th>
              <th className="py-3.5 px-4">AI Prediction</th>
              <th className="py-3.5 px-4">Confidence</th>
              <th className="py-3.5 px-4">Severity</th>
              <th className="py-3.5 px-4">Risk</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-mono font-bold text-slate-900 block">{c.id}</span>
                  <span className="text-[10px] text-slate-400">{formatDate(c.createdAt)}</span>
                </td>

                <td className="py-3 px-4">
                  <span className="font-bold text-slate-800 block">{c.crop}</span>
                  <span className="text-[11px] text-slate-500">{c.district}</span>
                </td>

                <td className="py-3 px-4 max-w-[180px]">
                  <span className="font-semibold text-slate-900 line-clamp-1">
                    {c.detection?.diseaseName}
                  </span>
                  <span className="text-[10px] text-slate-400 block">{c.detection?.pathogenType}</span>
                </td>

                <td className="py-3 px-4 font-mono font-bold">
                  {formatPercent(c.detection?.confidence)}
                </td>

                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.detection?.severity === 'SEVERE' ? 'bg-rose-100 text-rose-800' : c.detection?.severity === 'MODERATE' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {c.detection?.severity}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span className={`font-mono font-bold ${
                    c.riskAssessment?.riskLevel === 'HIGH' ? 'text-rose-600' : 'text-slate-700'
                  }`}>
                    {c.riskAssessment?.riskScore}/100
                  </span>
                </td>

                <td className="py-3 px-4">
                  {getStatusBadge(c.status)}
                </td>

                <td className="py-3 px-4 text-right">
                  <Link
                    to={`/expert/cases/${c.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-agri-50 text-agri-700 font-bold hover:bg-agri-100 transition-colors"
                  >
                    <span>Review</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseTable;
