import React from 'react';
import { AlertTriangle, Users, MapPin } from 'lucide-react';

export const HotspotPopup = ({ hotspot }) => {
  if (!hotspot) return null;

  return (
    <div className="p-1 space-y-1.5 text-xs">
      <div className="flex items-center gap-1 font-bold text-slate-900">
        <MapPin className="w-3.5 h-3.5 text-rose-600" />
        <span>{hotspot.village || 'Outbreak Pocket'}</span>
      </div>

      <div className="text-[11px] text-slate-600 space-y-0.5">
        <div><strong>District:</strong> {hotspot.district}</div>
        <div><strong>Threat:</strong> <span className="text-rose-700 font-semibold">{hotspot.threat}</span></div>
        <div><strong>Active Cases:</strong> <span className="font-bold font-mono">{hotspot.cases} clusters</span></div>
      </div>

      <div className="pt-1 border-t border-slate-100 text-[9px] text-slate-400 italic">
        *Privacy preserved via 2.5 km Gaussian spatial perturbation.
      </div>
    </div>
  );
};

export default HotspotPopup;
