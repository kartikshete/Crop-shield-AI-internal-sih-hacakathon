import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, Camera, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ImageQuality = ({ qualityResult }) => {
  const { t } = useLanguage();
  if (!qualityResult) return null;

  const { passed, blurScore, illuminationScore, issues, statusText } = qualityResult;

  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      passed 
        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
        : 'bg-rose-50/90 border-rose-300 text-rose-950 shadow-md'
    }`}>
      <div className="flex items-start gap-3.5">
        <div className={`p-2 rounded-xl flex-shrink-0 ${
          passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {passed ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-bold">
              {passed ? t('farmer.qualityPassed') : t('farmer.qualityFailed')}
            </h4>
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
              passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
            }`}>
              OpenCV Laplacian Gate: {passed ? 'PASSED' : 'REJECTED'}
            </span>
          </div>

          <p className="text-xs opacity-90 leading-relaxed">
            {statusText || (passed ? 'Sharp leaf margin detected; suitable for neural network classification.' : 'High motion blur or low light detected.')}
          </p>

          {/* Metric Telemetry Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            <div className="bg-white/80 rounded-xl p-2 border border-slate-200/60 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Blur Variance</span>
              <span className={`text-xs font-bold font-mono ${blurScore >= 100 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {blurScore?.toFixed(1) || '0.0'} / 100.0
              </span>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-slate-200/60 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Illumination Value</span>
              <span className="text-xs font-bold font-mono text-slate-800">
                {illuminationScore?.toFixed(1) || '120.0'} / 255
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/80 rounded-xl p-2 border border-slate-200/60 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Safety Gate</span>
              <span className={`text-xs font-bold ${passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                {passed ? 'Reliable Input' : 'Re-scan Advised'}
              </span>
            </div>
          </div>

          {/* Corrective Guidance if Failed */}
          {!passed && (
            <div className="mt-2.5 p-3 rounded-xl bg-white/90 border border-rose-200 text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Farmer Guidance for Accurate Diagnosis:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                <li>Hold the phone with both hands steady about 15 cm from the leaf.</li>
                <li>Ensure the leaf is in natural daylight, avoiding strong dark shadows.</li>
                <li>Focus on the specific spot where spots or discoloration appear.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageQuality;
