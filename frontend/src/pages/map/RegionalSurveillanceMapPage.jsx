import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useMapData } from '../../hooks/useMapData';
import { MapPin, Filter, ShieldCheck, Info, Layers } from 'lucide-react';
import MaharashtraMap from '../../components/map/MaharashtraMap';
import DistrictCard from '../../components/map/DistrictCard';
import RiskLegend from '../../components/map/RiskLegend';
import Loader from '../../components/common/Loader';

export const RegionalSurveillanceMapPage = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('ALL');
  const { districts, hotspots, loading, selectedDistrict, setSelectedDistrict } = useMapData(selectedCrop);

  const cropFilters = [
    { id: 'ALL', label: 'All Crops (सर्व पिके)' },
    { id: 'Cotton', label: 'Cotton (कापूस)' },
    { id: 'Soybean', label: 'Soybean (सोयाबीन)' },
    { id: 'Tomato', label: 'Tomato (टोमॅटो)' },
    { id: 'Sugarcane', label: 'Sugarcane (ऊस)' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agri-600 mb-1 block">
            Statewide Biosecurity Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-agri-600" />
            <span>{t('map.title')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('map.subtitle')}
          </p>
        </div>

        {/* Crop Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          {cropFilters.map((cf) => (
            <button
              key={cf.id}
              onClick={() => setSelectedCrop(cf.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCrop === cf.id
                  ? 'bg-agri-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Leaflet Map Container */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="h-[520px] rounded-3xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <Loader text="Loading Maharashtra geographic spatial boundaries & outbreak telemetry..." />
            </div>
          ) : (
            <MaharashtraMap
              districts={districts}
              hotspots={hotspots}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(d) => setSelectedDistrict(d)}
              className="h-[520px] w-full"
            />
          )}
        </div>

        {/* Selected District Telemetry Sidebar */}
        <div className="space-y-4">
          <DistrictCard district={selectedDistrict || districts[0]} />

          {/* Privacy Preservation Technical Note */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-agri-600" />
              <span>Privacy-Preserving Spatial Aggregation</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-500">
              In accordance with ethical AI in agriculture, individual farm boundaries are never revealed on public heatmaps. Active cases are aggregated to Taluka centroids with Gaussian perturbation ($\pm 2.5\text{ km}$) guaranteeing farmer privacy while alerting surrounding growers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalSurveillanceMapPage;
