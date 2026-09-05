import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCaseContext } from '../../context/CaseContext';
import { History, Camera, ArrowRight, Eye, ShieldCheck } from 'lucide-react';
import { formatDate, formatPercent } from '../../utils/formatters';
import Button from '../../components/common/Button';

export const CaseHistoryPage = () => {
  const { t, lang } = useLanguage();
  const { history, setCurrentCase } = useCaseContext();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agri-600 mb-1 block">
            Field Scans Archive
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-agri-600" />
            <span>My Crop Scan History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Chronological audit of previous leaf scans and expert verification logs.
          </p>
        </div>

        <Link to="/farmer/detection">
          <Button icon={Camera} size="md">
            New Leaf Scan
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {history.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start gap-3">
              <img
                src={c.imageUrl}
                alt={c.crop}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-agri-700 bg-agri-50 px-2 py-0.5 rounded-md">
                    {c.id}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {formatDate(c.createdAt)}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1">
                  {c.detection?.diseaseName}
                </h3>
                <p className="text-xs text-slate-500">
                  {c.crop} • {c.district}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                c.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {c.status}
              </span>

              <Link
                to="/farmer/result"
                onClick={() => setCurrentCase(c)}
                className="text-xs font-bold text-agri-600 hover:text-agri-700 flex items-center gap-1"
              >
                <span>View Full Dossier</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseHistoryPage;
