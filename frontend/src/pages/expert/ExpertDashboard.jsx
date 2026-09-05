import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { expertService } from '../../services/expertService';
import { ShieldCheck, Filter, Search, RefreshCw, AlertTriangle } from 'lucide-react';
import ExpertStats from '../../components/expert/ExpertStats';
import CaseTable from '../../components/expert/CaseTable';
import Loader from '../../components/common/Loader';
import { DISTRICTS } from '../../utils/constants';

export const ExpertDashboard = () => {
  const { t } = useLanguage();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const loadCases = async () => {
    setLoading(true);
    try {
      const data = await expertService.getTriageQueue();
      setCases(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const filteredCases = cases.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (districtFilter !== 'ALL' && c.district !== districtFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchId = c.id.toLowerCase().includes(term);
      const matchCrop = c.crop.toLowerCase().includes(term);
      const matchDisease = c.detection?.diseaseName?.toLowerCase().includes(term);
      const matchFarmer = c.farmerName?.toLowerCase().includes(term);
      if (!matchId && !matchCrop && !matchDisease && !matchFarmer) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1 block">
            Agricultural Extension & KVK Officer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-purple-600" />
            <span>{t('expert.dashboardTitle')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('expert.dashboardDesc')}
          </p>
        </div>

        <button
          type="button"
          onClick={loadCases}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Triage Queue</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <ExpertStats cases={cases} />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Case ID, Crop, Disease, Farmer..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="VERIFIED">Verified</option>
            <option value="CORRECTED">Corrected</option>
            <option value="RETAKE_REQUESTED">Retake Requested</option>
          </select>

          {/* District filter */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option value="ALL">All Districts</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cases Queue Table */}
      {loading ? (
        <div className="p-12 text-center">
          <Loader text="Loading priority agronomist queue..." />
        </div>
      ) : (
        <CaseTable cases={filteredCases} />
      )}
    </div>
  );
};

export default ExpertDashboard;
