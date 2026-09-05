import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { 
  Sprout, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  TrendingUp, 
  History, 
  Menu, 
  X, 
  Search,
  Activity
} from 'lucide-react';

export const Navbar = () => {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/farmer', label: t('nav.farmer'), icon: Sprout },
    { path: '/farmer/detection', label: t('nav.detection'), icon: Search, highlight: true },
    { path: '/map', label: t('nav.map'), icon: MapPin },
    { path: '/farmer/forecast', label: t('nav.forecast'), icon: TrendingUp },
    { path: '/farmer/alerts', label: t('nav.alerts'), icon: Bell },
    { path: '/farmer/history', label: t('nav.history'), icon: History },
    { path: '/expert', label: t('nav.expert'), icon: ShieldCheck },
  ];

  const isActive = (path) => {
    if (path === '/farmer' && location.pathname === '/farmer') return true;
    if (path !== '/farmer' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <Link to="/farmer" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center text-white shadow-md shadow-agri-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-agri-700 transition-colors">
                  ZENITH <span className="text-agri-600">CROPShield</span>
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block leading-none">
                AI Early-Warning & Precision Agriculture
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    link.highlight
                      ? 'bg-agri-600 text-white shadow-sm hover:bg-agri-700 ml-1'
                      : active
                      ? 'bg-agri-50 text-agri-700 font-bold border border-agri-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.highlight ? 'text-white' : active ? 'text-agri-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Selector & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <LanguageSelector />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  link.highlight
                    ? 'bg-agri-600 text-white shadow-sm'
                    : active
                    ? 'bg-agri-50 text-agri-700 border border-agri-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${link.highlight ? 'text-white' : active ? 'text-agri-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
