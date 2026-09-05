import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import RiskLegend from './RiskLegend';
import HotspotPopup from './HotspotPopup';
import { useLanguage } from '../../context/LanguageContext';

export const MaharashtraMap = ({
  districts = [],
  hotspots = [],
  selectedDistrict = null,
  onSelectDistrict = () => {},
  className = 'h-[500px] w-full',
}) => {
  const { lang } = useLanguage();
  // Central coordinates of Maharashtra State
  const maharashtraCenter = [19.6500, 76.1000];

  const getMarkerColor = (level) => {
    switch (level) {
      case 'HIGH':
        return '#e11d48'; // Rose-600
      case 'MODERATE':
        return '#f59e0b'; // Amber-500
      case 'LOW':
      default:
        return '#10b981'; // Emerald-500
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-slate-200 shadow-card bg-slate-100 ${className}`}>
      <MapContainer
        center={maharashtraCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Render District Centroid Nodes */}
        {districts.map((d) => {
          const isSelected = selectedDistrict?.id === d.id;
          const color = getMarkerColor(d.riskLevel);
          const radius = Math.max(12, Math.min(26, 10 + d.activeCases * 0.7));

          return (
            <CircleMarker
              key={d.id}
              center={d.coordinates}
              radius={radius}
              pathOptions={{
                fillColor: color,
                fillOpacity: isSelected ? 0.9 : 0.75,
                color: isSelected ? '#1e293b' : '#ffffff',
                weight: isSelected ? 3 : 1.5,
              }}
              eventHandlers={{
                click: () => onSelectDistrict(d),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                <div className="font-bold text-xs">
                  {lang === 'mr' && d.nameMr ? d.nameMr : d.name} ({d.riskLevel} Risk)
                </div>
                <div className="text-[10px] text-slate-500">
                  {d.activeCases} active cases • {d.dominantCrop}
                </div>
              </Tooltip>

              <Popup>
                <div className="p-1 space-y-1 text-xs">
                  <div className="font-bold text-sm text-slate-900">
                    {lang === 'mr' && d.nameMr ? d.nameMr : d.name}
                  </div>
                  <div className="text-slate-600">
                    <div><strong>Dominant Crop:</strong> {d.dominantCrop}</div>
                    <div><strong>Risk Score:</strong> <span className="font-bold">{d.riskScore}/100</span></div>
                    <div><strong>Active Threat:</strong> {d.dominantThreat}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectDistrict(d)}
                    className="w-full mt-2 py-1 px-2 rounded-lg bg-agri-600 text-white font-bold text-[10px] hover:bg-agri-700"
                  >
                    Inspect District Telemetry
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Render Privacy-Preserved Aggregated Hotspots */}
        {hotspots.map((h, index) => (
          <CircleMarker
            key={`hotspot-${index}`}
            center={[h.lat, h.lng]}
            radius={6}
            pathOptions={{
              fillColor: '#dc2626',
              fillOpacity: 0.9,
              color: '#ffffff',
              weight: 1,
            }}
          >
            <Popup>
              <HotspotPopup hotspot={h} />
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Floating Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-[400] max-w-xs pointer-events-auto">
        <RiskLegend />
      </div>
    </div>
  );
};

export default MaharashtraMap;
