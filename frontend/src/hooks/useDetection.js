import { useState } from 'react';
import { detectionService } from '../services/detectionService';
import { useCaseContext } from '../context/CaseContext';

export const useDetection = () => {
  const { currentCase, setCurrentCase, history, setHistory } = useCaseContext();
  const [analyzing, setAnalyzing] = useState(false);
  const [qualityChecking, setQualityChecking] = useState(false);
  const [qualityResult, setQualityResult] = useState(null);
  const [error, setError] = useState(null);

  const checkQuality = async (file, isBlurry = false) => {
    setQualityChecking(true);
    setError(null);
    try {
      const res = await detectionService.checkImageQuality(file, isBlurry);
      setQualityResult(res);
      return res;
    } catch (err) {
      setError('Quality gate evaluation failed.');
      return { passed: true };
    } finally {
      setQualityChecking(false);
    }
  };

  const runDiagnosis = async ({ file, crop, district, sampleId = null }) => {
    setAnalyzing(true);
    setError(null);
    try {
      const result = await detectionService.detectDisease({ file, crop, district, sampleId });
      setCurrentCase(result);
      setHistory(prev => [result, ...prev]);
      return result;
    } catch (err) {
      setError(err?.message || 'Failed to complete disease diagnosis.');
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  return {
    currentCase,
    analyzing,
    qualityChecking,
    qualityResult,
    error,
    checkQuality,
    runDiagnosis,
    setCurrentCase
  };
};
