import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Farmer Pages
import FarmerDashboard from '../pages/farmer/FarmerDashboard';
import ScanCropPage from '../pages/farmer/ScanCropPage';
import DiagnosisResultPage from '../pages/farmer/DiagnosisResultPage';
import ForecastPage from '../pages/farmer/ForecastPage';
import AlertsPage from '../pages/farmer/AlertsPage';
import CaseHistoryPage from '../pages/farmer/CaseHistoryPage';
import FollowUpPage from '../pages/farmer/FollowUpPage';

// Map Page
import RegionalSurveillanceMapPage from '../pages/map/RegionalSurveillanceMapPage';

// Expert Pages
import ExpertDashboard from '../pages/expert/ExpertDashboard';
import CaseReviewPage from '../pages/expert/CaseReviewPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect to Farmer Portal */}
      <Route path="/" element={<Navigate to="/farmer" replace />} />

      {/* Farmer Routes */}
      <Route path="/farmer" element={<FarmerDashboard />} />
      <Route path="/farmer/detection" element={<ScanCropPage />} />
      <Route path="/farmer/result" element={<DiagnosisResultPage />} />
      <Route path="/farmer/forecast" element={<ForecastPage />} />
      <Route path="/farmer/alerts" element={<AlertsPage />} />
      <Route path="/farmer/history" element={<CaseHistoryPage />} />
      <Route path="/farmer/follow-up" element={<FollowUpPage />} />

      {/* Surveillance Map Route */}
      <Route path="/map" element={<RegionalSurveillanceMapPage />} />

      {/* Expert Triage Routes */}
      <Route path="/expert" element={<ExpertDashboard />} />
      <Route path="/expert/cases/:caseId" element={<CaseReviewPage />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/farmer" replace />} />
    </Routes>
  );
};

export default AppRoutes;
