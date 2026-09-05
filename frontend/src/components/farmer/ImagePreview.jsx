import React from 'react';
import { RefreshCw, Check, AlertTriangle, Eye } from 'lucide-react';
import Button from '../common/Button';

export const ImagePreview = ({ imageUrl, onRetake, onProceed, qualityPassed = true }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Eye className="w-4 h-4 text-agri-600" />
          <span>Foliage Image Capture</span>
        </h4>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
          qualityPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }`}>
          {qualityPassed ? 'Resolution Checked' : 'Quality Warning'}
        </span>
      </div>

      <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
        <img
          src={imageUrl}
          alt="Selected crop leaf"
          className="w-full h-full object-cover"
        />

        {/* Scan line overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-agri-500/10 to-transparent pointer-events-none" />
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button variant="outline" size="md" icon={RefreshCw} onClick={onRetake}>
          Take Different Photo
        </Button>
        {qualityPassed && (
          <Button variant="primary" size="md" icon={Check} onClick={onProceed}>
            Run AI Diagnosis
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
