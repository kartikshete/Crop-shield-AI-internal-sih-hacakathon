import React, { useState } from 'react';
import { CheckCircle2, Edit3, Camera, Bell, Send, Check } from 'lucide-react';
import Button from '../common/Button';
import { expertService } from '../../services/expertService';

export const ValidationPanel = ({ caseItem, onValidated = null }) => {
  const [action, setAction] = useState('CONFIRM'); // CONFIRM | CORRECT | REQUEST_IMAGE
  const [confirmedDisease, setConfirmedDisease] = useState(caseItem?.detection?.diseaseName || '');
  const [notes, setNotes] = useState('');
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validatedSuccess, setValidatedSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await expertService.validateCase(caseItem.id, {
        action,
        confirmedDisease,
        notes,
        triggerAlert
      });
      setValidatedSuccess(true);
      if (onValidated) onValidated();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (validatedSuccess) {
    return (
      <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <Check className="w-7 h-7" />
        </div>
        <h3 className="text-base font-extrabold text-emerald-900">
          Validation Submitted Successfully!
        </h3>
        <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
          Case <span className="font-mono font-bold">{caseItem.id}</span> status has been updated. Farmer advisory reflects your expert verification.
          {triggerAlert && ' Regional biosecurity alert has been broadcast to farmers in this district.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900">
            Agronomist Validation Decision
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Human-in-the-loop audit log & continuous learning feedback
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
          Expert Action
        </span>
      </div>

      {/* Action Selection */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setAction('CONFIRM')}
          className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
            action === 'CONFIRM'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm AI</span>
        </button>

        <button
          type="button"
          onClick={() => setAction('CORRECT')}
          className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
            action === 'CORRECT'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Correct Diagnosis</span>
        </button>

        <button
          type="button"
          onClick={() => setAction('REQUEST_IMAGE')}
          className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
            action === 'REQUEST_IMAGE'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Request Retake</span>
        </button>
      </div>

      {/* If Correct Action, input field for actual disease */}
      {action === 'CORRECT' && (
        <div className="space-y-1 animate-fadeIn">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            Agronomist Corrected Pathology Name:
          </label>
          <input
            type="text"
            value={confirmedDisease}
            onChange={(e) => setConfirmedDisease(e.target.value)}
            placeholder="e.g. Cercospora Leaf Spot or Nutrient Deficiency"
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      )}

      {/* Expert Agronomic Notes */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
          Agronomic Guidance & Prescribed Advisory:
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Specific field hygiene instructions, biocontrol recommendations, or safe spray precautions..."
          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-agri-500"
        />
      </div>

      {/* Trigger Community Alert Checkbox */}
      <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 cursor-pointer">
        <input
          type="checkbox"
          checked={triggerAlert}
          onChange={(e) => setTriggerAlert(e.target.checked)}
          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-amber-300"
        />
        <div className="flex items-center gap-1.5 font-bold">
          <Bell className="w-4 h-4 text-amber-600" />
          <span>Broadcast Regional Biosecurity Warning to {caseItem?.district} District</span>
        </div>
      </label>

      {/* Submit Action */}
      <Button
        type="submit"
        loading={submitting}
        icon={Send}
        variant={action === 'CONFIRM' ? 'primary' : action === 'CORRECT' ? 'secondary' : 'outline'}
        className="w-full"
      >
        Submit Agronomist Decision
      </Button>
    </form>
  );
};

export default ValidationPanel;
