import React from 'react';
import { CloudRain, Droplets, Thermometer, Wind, Sun } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WeatherCard = ({ weather }) => {
  const { t, lang } = useLanguage();
  if (!weather) return null;

  const { temp, humidity, rainfall, windSpeed, condition, conditionMr, conditionHi } = weather;

  const displayCondition = lang === 'mr' && conditionMr 
    ? conditionMr 
    : lang === 'hi' && conditionHi 
    ? conditionHi 
    : condition;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-blue-600" />
          <span>{t('farmer.weatherTitle')}</span>
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {displayCondition || 'Humid'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
          <Thermometer className="w-4 h-4 text-amber-600 mx-auto mb-1" />
          <span className="text-[11px] text-slate-500 block">Temperature</span>
          <span className="text-base font-extrabold text-slate-800">{temp}°C</span>
        </div>

        <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
          <Droplets className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <span className="text-[11px] text-slate-500 block">Relative Humidity</span>
          <span className={`text-base font-extrabold ${humidity > 80 ? 'text-rose-600' : 'text-slate-800'}`}>
            {humidity}%
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center">
          <CloudRain className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
          <span className="text-[11px] text-slate-500 block">Rainfall</span>
          <span className="text-base font-extrabold text-slate-800">{rainfall} mm</span>
        </div>

        <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 text-center">
          <Wind className="w-4 h-4 text-teal-600 mx-auto mb-1" />
          <span className="text-[11px] text-slate-500 block">Wind Velocity</span>
          <span className="text-base font-extrabold text-slate-800">{windSpeed} km/h</span>
        </div>
      </div>

      {humidity > 80 && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong>Sporulation Alert:</strong> Relative humidity exceeds 80%. Fungal spore germination is highly favored in this microclimate.
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
