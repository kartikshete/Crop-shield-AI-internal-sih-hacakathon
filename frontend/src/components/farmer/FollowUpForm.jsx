import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Camera, Send } from 'lucide-react';
import Button from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { detectionService } from '../../services/detectionService';

export const FollowUpForm = ({ caseId = 'CS-2026-1023', onSubmitted = null }) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState('IMPROVING'); // IMPROVING | UNCHANGED | WORSENED
  const [treatments, setTreatments] = useState({
    cultural: true,
    traps: true,
    biocontrol: false,
    chemical: false
  });
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await detectionService.submitFollowUp({
        caseId,
        status,
        treatmentsApplied: Object.keys(treatments).filter(k => treatments[k]),
        notes
      });
      setSuccess(true);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-emerald-900">
          Follow-Up Successfully Logged!
        </h3>
        <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
          Thank you for reporting. Your recovery log helps our epidemiological model learn and refine outbreak predictions for your district.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      <div>
        <h3 className="text-base font-extrabold text-slate-900">
          Field Recovery Follow-Up Report
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Case ID: <span className="font-mono font-bold text-agri-700">{caseId}</span> (3–5 Days Post-Advisory)
        </p>
      </div>

      {/* Condition status radio buttons */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Current Crop Condition:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'IMPROVING', label: 'Improving (सुधारत आहे)', color: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
            { id: 'UNCHANGED', label: 'Unchanged (स्थिर आहे)', color: 'bg-amber-50 border-amber-300 text-amber-800' },
            { id: 'WORSENED', label: 'Worsening (वाढत आहे)', color: 'bg-rose-50 border-rose-300 text-rose-800' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStatus(item.id)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                status === item.id
                  ? `${item.color} ring-2 ring-agri-500 shadow-sm`
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Treatments applied checkboxes */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Actions Implemented:
        </label>
        <div className="space-y-2">
          {[
            { key: 'cultural', label: 'Removed & buried diseased leaves / improved drainage' },
            { key: 'traps', label: 'Installed sticky cards / pheromone lures' },
            { key: 'biocontrol', label: 'Sprayed bio-agent (Trichoderma / Pseudomonas / Neem)' },
            { key: 'chemical', label: 'Applied approved chemical fungicide' },
          ].map((tItem) => (
            <label key={tItem.key} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={treatments[tItem.key]}
                onChange={(e) => setTreatments({ ...treatments, [tItem.key]: e.target.checked })}
                className="w-4 h-4 rounded text-agri-600 focus:ring-agri-500 border-slate-300"
              />
              <span>{tItem.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Field notes */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
          Additional Observations (Optional):
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. New growth leaves appearing healthy, spots drying out..."
          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-agri-500"
        />
      </div>

      <Button type="submit" loading={submitting} icon={Send} className="w-full">
        Submit Follow-up Outcome
      </Button>
    </form>
  );
};

export default FollowUpForm;
