import api from './api';
import { mockCases } from '../data/mockCases';

export const detectionService = {
  // Simulate or execute OpenCV Laplacian Quality Gate
  async checkImageQuality(file, isBlurrySample = false) {
    try {
      // If mock mode or demo file
      if (isBlurrySample) {
        return {
          passed: false,
          blurScore: 42.1,
          illuminationScore: 32.0,
          statusText: 'Image is blurry or poorly illuminated',
          issues: [
            'Motion blur detected (Score: 42.1, minimum: 100.0)',
            'Low contrast / underexposure in leaf area'
          ]
        };
      }
      return {
        passed: true,
        blurScore: 165.2,
        illuminationScore: 142.0,
        statusText: 'Optimal Quality & Sharpness',
        issues: []
      };
    } catch (err) {
      return { passed: true, blurScore: 120.0, issues: [] };
    }
  },

  // Disease classification & advisory retrieval
  async detectDisease({ file, crop, district, sampleId = null }) {
    // Artificial 1.2s delay to simulate ML inference
    await new Promise((r) => setTimeout(r, 1200));

    try {
      // If sample selected, return corresponding matched case
      if (sampleId) {
        const found = mockCases.find((c) => c.id === sampleId);
        if (found) return { ...found, createdAt: new Date().toISOString() };
      }

      // If specific crop selected, map intelligently
      const cropCase = mockCases.find((c) => c.crop.toLowerCase() === (crop || '').toLowerCase());
      if (cropCase) {
        return {
          ...cropCase,
          id: `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          district: district || cropCase.district,
          createdAt: new Date().toISOString(),
        };
      }

      // Default to high-fidelity cotton scenario
      return {
        ...mockCases[0],
        id: `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        district: district || 'Akola',
        createdAt: new Date().toISOString(),
      };
    } catch (err) {
      return mockCases[0];
    }
  },

  async getCaseById(caseId) {
    await new Promise((r) => setTimeout(r, 300));
    const found = mockCases.find((c) => c.id === caseId);
    return found || mockCases[0];
  },

  async getHistory() {
    await new Promise((r) => setTimeout(r, 400));
    return mockCases;
  },

  async submitFollowUp(data) {
    await new Promise((r) => setTimeout(r, 800));
    return {
      success: true,
      message: 'Follow-up registered successfully. Agronomist updated.',
      timestamp: new Date().toISOString()
    };
  }
};
