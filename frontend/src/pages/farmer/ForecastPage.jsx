import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useWeather } from '../../hooks/useWeather';
import { DISTRICTS } from '../../utils/constants';
import { TrendingUp, MapPin, AlertTriangle, CloudSun, ShieldAlert } from 'lucide-react';
import WeatherCard from '../../components/farmer/WeatherCard';
import RiskForecast from '../../components/farmer/RiskForecast';

export const ForecastPage = () => {
  const { t } = useLanguage();
  const [district, setDistrict] = useState('Akola');
  const { weather, loading } = useWeather(district);

  // Generate dynamic 7-day risk timeline based on district
  const mockTimeline = [
    { day: 1, date: 'Today', riskScore: district === 'Nashik' ? 89 : district === 'Akola' ? 82 : 45, level: (district === 'Nashik' || district === 'Akola') ? 'HIGH' : 'MODERATE', desc: 'Optimal sporulation moisture' },
    { day: 2, date: 'Day 2', riskScore: district === 'Nashik' ? 92 : district === 'Akola' ? 85 : 48, level: (district === 'Nashik' || district === 'Akola') ? 'HIGH' : 'MODERATE', desc: 'Spore cloud expansion' },
    { day: 3, date: 'Day 3', riskScore: district === 'Nashik' ? 88 : district === 'Akola' ? 88 : 52, level: (district === 'Nashik' || district === 'Akola') ? 'HIGH' : 'MODERATE', desc: 'Peak secondary infection' },
    { day: 4, date: 'Day 4', riskScore: district === 'Nashik' ? 80 : district === 'Akola' ? 76 : 46, level: (district === 'Nashik' || district === 'Akola') ? 'HIGH' : 'MODERATE', desc: 'Humidity remains elevated' },
    { day: 5, date: 'Day 5', riskScore: district === 'Nashik' ? 70 : district === 'Akola' ? 64 : 38, level: district === 'Nashik' ? 'HIGH' : 'MODERATE', desc: 'Direct sun reduces germination' },
    { day: 6, date: 'Day 6', riskScore: district === 'Nashik' ? 58 : district === 'Akola' ? 52 : 30, level: 'MODERATE', desc: 'Stabilizing foliage' },
    { day: 7, date: 'Day 7', riskScore: district === 'Nashik' ? 46 : district === 'Akola' ? 40 : 25, level: 'LOW', desc: 'Normal conditions' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agri-600 mb-1 block">
            Epidemiological Predictive Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            3–7 Day Crop Disease Risk Forecast
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Predicts where pathogens will incubate based on temperature, relative humidity, and rainfall.
          </p>
        </div>

        {/* District Selector */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <MapPin className="w-4 h-4 text-agri-600" />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer pr-2"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d} District</option>
            ))}
          </select>
        </div>
      </div>

      <RiskForecast timeline={mockTimeline} />

      <WeatherCard weather={weather} />

      {/* Agronomic explanation */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-agri-600" />
          <span>How Does the Early-Warning Forecast Work?</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The ZENITH predictive model correlates microclimate thresholds with fungal sporulation curves. When relative humidity sustains $>80\%$ at temperatures between $26^\circ\text{C} - 32^\circ\text{C}$ for over 48 hours, spore germination accelerates exponentially. By predicting outbreaks 3 to 7 days before physical symptoms appear, farmers can apply bio-fungicide protective barriers like <em>Trichoderma viride</em> to prevent crop loss.
        </p>
      </div>
    </div>
  );
};

export default ForecastPage;
