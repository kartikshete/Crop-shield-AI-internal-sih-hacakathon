import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { detectionService } from '../../services/detectionService';
import CaseDetails from '../../components/expert/CaseDetails';
import ValidationPanel from '../../components/expert/ValidationPanel';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

export const CaseReviewPage = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [caseItem, setCaseItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCase = async () => {
    setLoading(true);
    try {
      const data = await detectionService.getCaseById(caseId);
      setCaseItem(data);
    } catch (err) {
      setError('Failed to fetch case diagnostic record.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [caseId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader text={`Loading case dossier for ${caseId}...`} />
      </div>
    );
  }

  if (error || !caseItem) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-4">
        <ErrorMessage message={error || 'Case not found'} />
        <button
          onClick={() => navigate('/expert')}
          className="text-xs font-bold text-agri-600 hover:underline"
        >
          ← Back to Expert Queue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/expert')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Triage Queue</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Case: {caseItem.id}
        </span>
      </div>

      {/* Case Diagnostic Dossier */}
      <CaseDetails caseItem={caseItem} />

      {/* Validation Decision Action Panel */}
      <ValidationPanel
        caseItem={caseItem}
        onValidated={() => {
          fetchCase();
        }}
      />
    </div>
  );
};

export default CaseReviewPage;
