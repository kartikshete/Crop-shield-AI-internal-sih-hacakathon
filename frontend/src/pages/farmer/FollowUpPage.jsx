import React from 'react';
import { useCaseContext } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FollowUpForm from '../../components/farmer/FollowUpForm';

export const FollowUpPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentCase } = useCaseContext();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-agri-600 mb-1 block">
          Continuous Epidemiological Learning
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Calendar className="w-6 h-6 text-agri-600" />
          <span>Follow-Up Outcome Reporting</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          Report field recovery progress 3 to 5 days after applying IPM recommendations. Your feedback trains the early-warning model to better predict treatment efficacy.
        </p>
      </div>

      <FollowUpForm
        caseId={currentCase?.id || 'CS-2026-1023'}
        onSubmitted={() => {}}
      />
    </div>
  );
};

export default FollowUpPage;
