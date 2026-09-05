import React, { useState } from 'react';
import { Bell, Filter, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockAlerts } from '../../data/mockAlerts';
import AlertCard from '../../components/farmer/AlertCard';

export const AlertsPage = () => {
  const { t } = useLanguage();
  const [filterSeverity, setFilterSeverity] = useState('ALL'); // ALL | CRITICAL | WARNING

  const filtered = mockAlerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1 block">
            Biosecurity Surveillance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-rose-600" />
            <span>Regional Crop Disease Alerts</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Broadcast advisories issued by District Agricultural Officers & KVK extension teams.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold">
          {['ALL', 'CRITICAL', 'WARNING'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterSeverity === sev
                  ? 'bg-agri-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
