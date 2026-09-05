import React from 'react';
import { ShieldAlert, UserCheck, HelpCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

export const UncertaintyCard = ({ confidence = 0.45, caseId = 'CS-2026-1027' }) => {
  return (
    <div className="p-6 rounded-3xl bg-purple-50/90 border border-purple-200 text-purple-950 shadow-card space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 flex-shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-purple-950">
            AI Uncertainty Safety Layer Active
          </h3>
          <p className="text-xs text-purple-700">
            Automated guardrail against erroneous disease misdiagnosis
          </p>
        </div>
      </div>

      <p className="text-xs text-purple-900 leading-relaxed">
        The Vision AI model detected ambiguous lesion patterns with confidence below 70%. In accordance with agricultural biosecurity standards, this scan has been automatically escalated to the <strong>Agronomist Expert Review Queue</strong>.
      </p>

      <div className="p-3.5 rounded-2xl bg-white/90 border border-purple-100 text-xs text-purple-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-purple-950">
          <UserCheck className="w-4 h-4 text-purple-700" />
          <span>Case Dispatched to Local Agricultural Officer:</span>
        </div>
        <p className="text-[11px] text-slate-600 pl-6">
          Case ID: <span className="font-mono font-bold text-purple-800">{caseId}</span>. An agronomist will review symptoms, inspect Grad-CAM activations, and confirm diagnosis within 24 hours.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <span className="text-[11px] font-semibold text-purple-800">
          Do NOT spray chemical fungicides until expert confirmation.
        </span>
        <Link to="/expert">
          <Button size="sm" variant="secondary" icon={ArrowRight}>
            View in Expert Queue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UncertaintyCard;
