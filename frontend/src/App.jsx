import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CaseProvider } from './context/CaseContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CaseProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </CaseProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
