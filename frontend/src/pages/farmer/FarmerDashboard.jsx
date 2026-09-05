import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCaseContext } from '../../context/CaseContext';
import { useWeather } from '../../hooks/useWeather';
import { 
  Camera, 
  MapPin, 
  Bell, 
  TrendingUp, 
  ShieldAlert, 
  ArrowRight, 
  Sprout, 
  Sparkles, 
  Activity, 
  CloudSun 
} from 'lucide-react';
import Button from '../../components/common/Button';
import CropHealthScore from '../../components/farmer/CropHealthScore';
import WeatherCard from '../../components/farmer/WeatherCard';
import AlertCard from '../../components/farmer/AlertCard';
import { CROPS } from '../../utils/constants';
import { mockAlerts } from '../../data/mockAlerts';

export const FarmerDashboard = () => {
  const { t, lang } = useLanguage();
  const { currentCase, history } = useCaseContext();
  const { weather } = useWeather('Akola');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner with Modern Agronomic Aesthetic */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-agri-800 via-agri-900 to-slate-950 text-white p-6 sm:p-10 shadow-elevated border border-agri-700/50">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-500/20 border border-agri-400/30 text-xs font-bold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Precision Early-Warning Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {t('farmer.heroTitle')}
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
            {t('farmer.heroSubtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/farmer/detection">
              <Button size="lg" icon={Camera} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/30 border-none">
                {t('farmer.startScanBtn')}
              </Button>
            </Link>

            <Link to="/map">
              <Button size="lg" variant="outline" icon={MapPin} className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm">
                {t('farmer.viewMapBtn')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient Decorative Leaves */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 bg-agri-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Overview Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CropHealthScore score={currentCase?.riskAssessment?.cropHealthIndex || 78} />
        
        {/* Quick Outbreak Status Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Regional Biosecurity Alert
            </span>
            <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
              <Bell className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-xl font-extrabold text-slate-900 block">
              Akola & Vidarbha Belt
            </span>
            <p className="text-xs text-rose-600 font-semibold mt-0.5">
              Alternaria Sporulation Peak Warning Active
            </p>
          </div>
          <Link to="/farmer/alerts" className="text-xs font-bold text-agri-600 hover:text-agri-700 flex items-center gap-1">
            <span>View 4 Active Advisories</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Weather Snapshot */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Microclimate Status
            </span>
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <CloudSun className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-slate-900">
              {weather?.temp || 31}°C • {weather?.humidity || 86}% RH
            </span>
            <p className="text-xs text-amber-700 font-medium mt-0.5">
              High humidity favors spore germination
            </p>
          </div>
          <Link to="/farmer/forecast" className="text-xs font-bold text-agri-600 hover:text-agri-700 flex items-center gap-1">
            <span>View 7-Day Risk Curve</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Crop Selector Grid for Instant Scouting */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">
            Select Your Crop to Inspect
          </h3>
          <span className="text-xs text-slate-400 font-medium">5 Maharashtra Staples</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CROPS.map((crop) => (
            <Link
              key={crop.id}
              to={`/farmer/detection?crop=${crop.id}`}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-agri-500 hover:shadow-card transition-all flex flex-col items-center text-center group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {crop.icon}
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                {lang === 'mr' ? crop.nameMr : lang === 'hi' ? crop.nameHi : crop.name}
              </span>
              <span className="text-[10px] text-agri-600 font-bold mt-1">
                Scan Leaf →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Alerts Feed */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-rose-600" />
            <span>{t('farmer.recentAlerts')}</span>
          </h3>
          <Link to="/farmer/alerts" className="text-xs font-bold text-agri-600 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAlerts.slice(0, 2).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FarmerDashboard;
