import React, { useRef, useState } from 'react';
import { Camera, Upload, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import { mockCases } from '../../data/mockCases';
import { useLanguage } from '../../context/LanguageContext';

export const ImageUpload = ({ onImageSelected, onSampleSelected, isQualityChecking }) => {
  const { t, lang } = useLanguage();
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelected({ file, url, isBlurry: false });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelected({ file, url, isBlurry: false });
    }
  };

  const handleSampleClick = (sampleCase) => {
    const isBlurry = sampleCase.imageQuality?.passed === false;
    onSampleSelected({
      sampleCase,
      url: sampleCase.imageUrl,
      isBlurry,
    });
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop or Camera Capture Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
          dragOver
            ? 'border-agri-500 bg-agri-50/80 scale-[1.01]'
            : 'border-slate-300 hover:border-agri-400 bg-white hover:bg-slate-50/60 shadow-card'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-agri-500 to-agri-600 text-white flex items-center justify-center shadow-lg shadow-agri-500/25 mb-4 group-hover:scale-105 transition-transform">
            <Camera className="w-8 h-8" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            {t('farmer.uploadTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
            {t('farmer.uploadDesc')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <Button
              size="md"
              icon={Camera}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Take Photo / Choose Image
            </Button>
          </div>
        </div>
      </div>

      {/* Preset Realistic Samples for Instant SIH Evaluation */}
      <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-3 text-slate-700">
          <Sparkles className="w-4 h-4 text-harvest-500 flex-shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {t('farmer.sampleImages')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {mockCases.map((c) => {
            const isBlurry = c.imageQuality?.passed === false;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSampleClick(c)}
                className="group relative flex flex-col items-center text-left bg-white p-2 rounded-xl border border-slate-200 hover:border-agri-500 hover:shadow-md transition-all text-xs"
              >
                <div className="relative w-full h-16 rounded-lg overflow-hidden mb-1.5 bg-slate-200">
                  <img
                    src={c.imageUrl}
                    alt={c.crop}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {isBlurry ? (
                    <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-600 text-white shadow-xs">
                      Blur Demo
                    </span>
                  ) : (
                    <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-agri-700 text-white shadow-xs">
                      {c.crop}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-slate-800 line-clamp-1">
                  {lang === 'mr' ? c.detection.diseaseNameMr || c.detection.diseaseName : c.detection.diseaseName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {c.district}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
