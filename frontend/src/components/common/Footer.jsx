import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, ShieldAlert, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-agri-600 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                ZENITH <span className="text-agri-400">CROPShield</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              AI-powered precision agriculture platform predicting crop disease outbreaks before they emerge.
              Built for farmers, agronomists, and surveillance authorities across Maharashtra.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Smart India Hackathon 2026 Prototype</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/farmer" className="hover:text-agri-400 transition-colors">Farmer Dashboard</Link>
              </li>
              <li>
                <Link to="/farmer/detection" className="hover:text-agri-400 transition-colors">Instant Leaf Scan</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-agri-400 transition-colors">Surveillance Outbreak Map</Link>
              </li>
              <li>
                <Link to="/farmer/forecast" className="hover:text-agri-400 transition-colors">3–7 Day Risk Forecast</Link>
              </li>
              <li>
                <Link to="/expert" className="hover:text-agri-400 transition-colors">Agronomist Triage Portal</Link>
              </li>
            </ul>
          </div>

          {/* Safety Rule Card */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>IPM Safety Principle</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-300 mb-1">Zero Blind Pesticide Rule:</p>
              Recommendations strictly prioritize field sanitation, physical traps, and biological agents. Chemical interventions are strictly restricted to verified high thresholds.
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ZENITH CROPShield. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by Zenith AI</span>
            <span>•</span>
            <span>Developed by Kartik Shete</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
