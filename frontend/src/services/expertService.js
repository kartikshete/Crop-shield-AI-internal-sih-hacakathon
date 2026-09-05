import api from './api';
import { mockCases } from '../data/mockCases';

let expertQueue = [...mockCases];

export const expertService = {
  async getTriageQueue() {
    await new Promise((r) => setTimeout(r, 400));
    return expertQueue;
  },

  async validateCase(caseId, { action, confirmedDisease, notes, triggerAlert }) {
    await new Promise((r) => setTimeout(r, 500));
    const target = expertQueue.find((c) => c.id === caseId);
    if (target) {
      if (action === 'CONFIRM') target.status = 'VERIFIED';
      if (action === 'CORRECT') {
        target.status = 'CORRECTED';
        target.detection.diseaseName = confirmedDisease;
      }
      if (action === 'REQUEST_IMAGE') target.status = 'RETAKE_REQUESTED';
      target.expertValidation = { action, notes, timestamp: new Date().toISOString() };
    }
    return { success: true, updatedCase: target };
  }
};
