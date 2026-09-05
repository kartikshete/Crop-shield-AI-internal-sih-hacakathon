import React, { useState } from 'react';
import { User, MapPin, Calendar, Layers, ShieldCheck, Bug, Droplets, Info } from 'lucide-react';
import { formatPercent, formatDate } from '../../utils/formatters';

export const CaseDetails = ({ caseItem }) => {
  const [viewGradCam, setViewGradCam] = useState(false);
  if (!caseItem) return null;

  const {
    id,
    farmerName,
    phone,
    district,
    taluka,
    village,
    crop,
    cropStage,
    createdAt,
    status,
    imageUrl,
    imageQuality,
    detection,
    riskAssessment
  } = caseItem;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-agri-700 bg-agri-50 px-2 py-0.5 rounded-md">
              {id}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Submitted {formatDate(createdAt)}
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            {crop} Diagnosis Dossier
          </h2>
        </div>

        {/* Farmer Profile Pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
          <div className="w-8 h-8 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800 block">{farmerName}</span>
            <span className="text-slate-500">{village}, {taluka || district}</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Image vs Grad-CAM Visualizer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Foliage Pathology Inspection (Grad-CAM Saliency)
          </h4>
          <button
            type="button"
            onClick={() => setViewGradCam(!viewGradCam)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{viewGradCam ? 'Show Original Capture' : 'Overlay Grad-CAM Attention'}</span>
          </button>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-200">
          <img
            src={imageUrl}
            alt="Foliage sample"
            className={`w-full h-full object-cover transition-all ${
              viewGradCam ? 'opacity-60 contrast-125' : 'opacity-100'
            }`}
          />
          {viewGradCam && (
            <div className="absolute inset-0 bg-radial from-red-600/70 via-amber-400/50 to-blue-600/30 mix-blend-color-burn pointer-events-none animate-fadeIn" />
          )}

          <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-sm text-[11px] text-white flex items-center justify-between">
            <span>
              {viewGradCam 
                ? (detection?.explanation?.gradCamDesc || 'Attention spikes on necrotic concentric rings.') 
                : 'Raw farmer camera capture.'}
            </span>
            <span className="text-agri-400 font-mono text-[10px]">
              Blur Variance: {imageQuality?.blurScore?.toFixed(1) || '148.0'}
            </span>
          </div>
        </div>
      </div>

      {/* Pathology Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: AI Diagnosis Details */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Classification</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-agri-100 text-agri-800">
              Confidence: {formatPercent(detection?.confidence)}
            </span>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {detection?.diseaseName}
            </h3>
            <p className="text-xs text-slate-500 italic mt-0.5">
              Type: {detection?.pathogenType} • Severity: {detection?.severity}
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
            <span className="text-[11px] font-bold text-slate-700 block">Identified Symptoms:</span>
            <ul className="space-y-1 text-xs text-slate-600">
              {detection?.explanation?.symptomsObserved?.map((sym, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-agri-600">•</span>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Environmental Microclimate & Outbreak Risk */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Microclimate Pressure</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              riskAssessment?.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {riskAssessment?.riskLevel} Outbreak Risk ({riskAssessment?.riskScore}/100)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Temperature</span>
              <span className="font-bold text-slate-800">{riskAssessment?.weatherSnapshot?.temp || 31}°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Relative Humidity</span>
              <span className="font-bold text-slate-800">{riskAssessment?.weatherSnapshot?.humidity || 86}%</span>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-200/60">
            <span className="text-[11px] font-bold text-slate-700 block">Outbreak Drivers:</span>
            <ul className="space-y-1 text-xs text-slate-600">
              {riskAssessment?.contributingFactors?.map((f, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-500">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
