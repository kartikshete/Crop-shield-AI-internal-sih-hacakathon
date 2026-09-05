import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCaseContext } from '../../context/CaseContext';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Camera, 
  Calendar, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import Button from '../../components/common/Button';
import DiseaseResult from '../../components/farmer/DiseaseResult';
import ConfidenceCard from '../../components/farmer/ConfidenceCard';
import ExplainableAI from '../../components/farmer/ExplainableAI';
import PredictionList from '../../components/farmer/PredictionList';
import WeatherCard from '../../components/farmer/WeatherCard';
import RiskScore from '../../components/farmer/RiskScore';
import RiskFactors from '../../components/farmer/RiskFactors';
import RiskForecast from '../../components/farmer/RiskForecast';
import AdvisoryCard from '../../components/farmer/AdvisoryCard';
import UncertaintyCard from '../../components/farmer/UncertaintyCard';

export const DiagnosisResultPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentCase } = useCaseContext();

  if (!currentCase) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No active diagnosis found</h2>
        <p className="text-xs text-slate-500">Please scan a crop leaf to generate a fresh diagnosis.</p>
        <Link to="/farmer/detection">
          <Button icon={Camera}>Scan My Crop</Button>
        </Link>
      </div>
    );
  }

  const isUncertain = (currentCase.detection?.confidence || 0) < 0.70 || currentCase.imageQuality?.passed === false;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Back and Action Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate('/farmer/detection')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex items-center gap-2">
          <Link to="/farmer/follow-up">
            <Button size="sm" variant="secondary" icon={Calendar}>
              Log Follow-Up
            </Button>
          </Link>
          <Link to="/farmer/detection">
            <Button size="sm" icon={Camera}>
              New Scan
            </Button>
          </Link>
        </div>
      </div>

      {/* Safety Layer Alert if Model is Uncertain */}
      {isUncertain && (
        <UncertaintyCard
          confidence={currentCase.detection?.confidence}
          caseId={currentCase.id}
        />
      )}

      {/* Primary Diagnosis Header */}
      <DiseaseResult
        detection={currentCase.detection}
        crop={currentCase.crop}
        district={currentCase.district}
      />

      {/* Confidence & Explainable AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConfidenceCard confidence={currentCase.detection?.confidence} />
        <PredictionList alternatives={currentCase.detection?.alternatives} />
      </div>

      {/* Saliency & Reasoning (Grad-CAM) */}
      <ExplainableAI
        explanation={currentCase.detection?.explanation}
        imageUrl={currentCase.imageUrl}
      />

      {/* Outbreak Risk Engine Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Microclimate Outbreak Predictive Risk
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RiskScore
            riskScore={currentCase.riskAssessment?.riskScore}
            riskLevel={currentCase.riskAssessment?.riskLevel}
          />
          <RiskFactors factors={currentCase.riskAssessment?.contributingFactors} />
        </div>

        <WeatherCard weather={currentCase.riskAssessment?.weatherSnapshot} />
        <RiskForecast timeline={currentCase.riskAssessment?.forecastTimeline} />
      </div>

      {/* Tiered IPM-First Advisory Card */}
      <div className="pt-2">
        <AdvisoryCard advisory={currentCase.advisory} />
      </div>
    </div>
  );
};

export default DiagnosisResultPage;
