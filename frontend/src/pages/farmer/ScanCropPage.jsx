import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useDetection } from '../../hooks/useDetection';
import { CROPS, DISTRICTS } from '../../utils/constants';
import { 
  Camera, 
  Upload, 
  MapPin, 
  Leaf, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import ImageUpload from '../../components/farmer/ImageUpload';
import ImagePreview from '../../components/farmer/ImagePreview';
import ImageQuality from '../../components/farmer/ImageQuality';
import VoiceInput from '../../components/farmer/VoiceInput';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

export const ScanCropPage = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedCrop, setSelectedCrop] = useState(searchParams.get('crop') || 'Cotton');
  const [selectedDistrict, setSelectedDistrict] = useState('Akola');
  const [selectedImage, setSelectedImage] = useState(null); // { file, url, isBlurry }
  const [sampleId, setSampleId] = useState(null);
  const [symptomVoiceNote, setSymptomVoiceNote] = useState('');

  const {
    analyzing,
    qualityChecking,
    qualityResult,
    error,
    checkQuality,
    runDiagnosis,
  } = useDetection();

  const handleImageSelected = async ({ file, url, isBlurry }) => {
    setSelectedImage({ file, url, isBlurry });
    setSampleId(null);
    await checkQuality(file, isBlurry);
  };

  const handleSampleSelected = async ({ sampleCase, url, isBlurry }) => {
    setSelectedImage({ file: null, url, isBlurry });
    setSampleId(sampleCase.id);
    setSelectedCrop(sampleCase.crop);
    setSelectedDistrict(sampleCase.district);
    await checkQuality(null, isBlurry);
  };

  const handleProceedDiagnosis = async () => {
    try {
      await runDiagnosis({
        file: selectedImage?.file,
        crop: selectedCrop,
        district: selectedDistrict,
        sampleId: sampleId,
      });
      navigate('/farmer/result');
    } catch (err) {
      console.error('Diagnosis execution error:', err);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader text="Vision AI classifying pathology & computing microclimate risk..." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-agri-600 mb-1 block">
          Precision Diagnosis
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Leaf Pathology & Outbreak Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Follow the prompt to capture or upload a leaf photo. Image quality is verified automatically.
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* Step 1: Crop and District Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-card">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-agri-600" />
            <span>Select Crop</span>
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-agri-500"
          >
            {CROPS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {lang === 'mr' ? c.nameMr : lang === 'hi' ? c.nameHi : c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-agri-600" />
            <span>Field District (Maharashtra)</span>
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-agri-500"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 2: Leaf Capture or Presets */}
      {!selectedImage ? (
        <ImageUpload
          onImageSelected={handleImageSelected}
          onSampleSelected={handleSampleSelected}
          isQualityChecking={qualityChecking}
        />
      ) : (
        <div className="space-y-4">
          <ImagePreview
            imageUrl={selectedImage.url}
            onRetake={() => {
              setSelectedImage(null);
              setSampleId(null);
            }}
            onProceed={handleProceedDiagnosis}
            qualityPassed={qualityResult?.passed !== false}
          />

          {qualityChecking ? (
            <div className="p-4 rounded-2xl bg-slate-100 text-center text-xs font-semibold text-slate-600 animate-pulse">
              Running OpenCV Laplacian blur variance analysis...
            </div>
          ) : (
            <ImageQuality qualityResult={qualityResult} />
          )}

          {/* Voice Input Symptom Addition for Accessibility */}
          <div className="space-y-1 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Optional Vernacular Audio Note (Voice Query):
            </span>
            <VoiceInput onSpeechResult={(txt) => setSymptomVoiceNote(txt)} />
          </div>

          <div className="pt-2">
            <Button
              size="lg"
              className="w-full text-base font-extrabold shadow-lg shadow-agri-600/20"
              onClick={handleProceedDiagnosis}
            >
              Analyze Foliage & Predict Outbreak Risk →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanCropPage;
