import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCases } from '../data/mockCases';
import { detectionService } from '../services/detectionService';

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
  const [currentCase, setCurrentCase] = useState(() => {
    return mockCases[0]; // Default to rich Cotton Alternaria case for initial demo
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await detectionService.getHistory();
      setHistory(data);
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <CaseContext.Provider value={{ currentCase, setCurrentCase, history, setHistory, loading, loadHistory }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCaseContext = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCaseContext must be used within a CaseProvider');
  }
  return context;
};
