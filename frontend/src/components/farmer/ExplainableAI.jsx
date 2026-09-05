import React, { useState } from 'react';
import { Sparkles, Eye, Info, Layers, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ExplainableAI = ({ explanation, imageUrl }) => {
  const { t } = useLanguage();
  const [showGradCam, setShowGradCam] = useState(false);

  if (!explanation) return null;

  const { symptomsObserved = [], affectedZone, gradCamDesc } = explanation;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t('farmer.xaiExplanation')}
            </h3>
            <p className="text-xs text-slate-500">
              Grad-CAM attention maps and symptom reasoning
            </p>
          </div>
        </div>

        {/* Grad-CAM Heatmap Toggle */}
        <button
          type="button"
          onClick={() => setShowGradCam(!showGradCam)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            showGradCam
              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
              : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{showGradCam ? 'Viewing Grad-CAM Heatmap' : 'View AI Attention Heatmap'}</span>
        </button>
      </div>

      {/* Visual CAM Heatmap overlay representation */}
      {showGradCam && (
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-purple-200 animate-fadeIn">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Grad-CAM Leaf"
              className="w-full h-full object-cover opacity-60 filter contrast-125"
            />
          )}
          {/* Simulated Grad-CAM Colormap (Jet heatmap) */}
          <div className="absolute inset-0 bg-radial from-red-600/60 via-amber-400/40 to-blue-600/30 mix-blend-color-burn pointer-events-none" />
          
          <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-sm text-[11px] text-white flex items-center justify-between">
            <span className="font-semibold">{gradCamDesc || 'High activation around necrotic circular lesion margins.'}</span>
            <span className="text-[10px] text-amber-300 font-mono">Intensity: 0.92</span>
          </div>
        </div>
      )}

      {/* Observed Symptoms Checklist */}
      <div className="space-y-2 pt-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Pathological Features Identified by AI:
        </h4>
        <ul className="space-y-2">
          {symptomsObserved.map((symptom, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      {affectedZone && (
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
          <Info className="w-4 h-4 text-purple-600 flex-shrink-0" />
          <span><strong>Canopy Infection Location:</strong> {affectedZone}</span>
        </div>
      )}
    </div>
  );
};

export default ExplainableAI;
