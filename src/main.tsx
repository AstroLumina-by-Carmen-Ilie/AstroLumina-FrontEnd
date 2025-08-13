import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles/starry-theme.css';
import 'flatpickr/dist/themes/material_blue.css';
import { LoadingProvider } from './contexts/LoadingContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import AstralPositions from './pages/services/AstralPositions';
import NatalChart from './pages/services/NatalChart';
import KarmicChart from './pages/services/KarmicChart';
import Bookings from './pages/services/Bookings';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import Services from './pages/Services';
import NotFound from './pages/NotFound';

// Declare the earlyLog property on the Window interface
declare global {
  interface Window {
    earlyLog?: (message: string) => void;
  }
}

// Use the early logging system if available
const log = (() => {
  let isLogging = false;
  return (message: string) => {
    if (isLogging) return; // Prevent recursive calls
    isLogging = true;
    try {
      if (import.meta.env.VITE_DEBUG_MODE) {
        console.log(message);
        if (window.earlyLog) {
          window.earlyLog(message);
        }
      }
    } finally {
      isLogging = false;
    }
  };
})();

// Global error handler to catch all errors
window.onerror = (msg, url, line, column, error) => {
  if (import.meta.env.VITE_DEBUG_MODE) {
    console.error('Global error:', { msg, url, line, column, error });
    log('Global error:' + msg + ' ' + url + ' ' + line + ' ' + column + ' ' + error)
    if (error?.stack) {
      console.error('Stack trace:', error.stack);
      log('Stack trace:' + ' ' + error.stack)
    }
  }
  return false;
};

const rootElement = document.getElementById('root');

if (import.meta.env.VITE_DEBUG_MODE) {
  log('⚛️ React initialization starting');
}

if (rootElement) {
  const root = createRoot(rootElement);

  try {
    root.render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <LoadingProvider>
            <Router>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/despre-mine" element={<AboutMe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/servicii" element={<Services />} />
                <Route path="/servicii/pozitia-astrelor" element={<AstralPositions />} />
                <Route path="/servicii/lumina-natala" element={<NatalChart />} />
                <Route path="/servicii/lumina-karmica" element={<KarmicChart />} />
                {/* <Route path="/servicii/lumina-previzionala" element={<NotFound />} /> */}
                {/* <Route path="/servicii/lumina-relationala" element={<NotFound />} /> */}
                <Route path="/servicii/consultatii" element={<Bookings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </LoadingProvider>
        </I18nextProvider>
      </React.StrictMode>
    );
    if (import.meta.env.VITE_DEBUG_MODE) {
      log('✅ React rendered successfully');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stackTrace = error instanceof Error ? error.stack : 'No stack trace available';
    if (import.meta.env.VITE_DEBUG_MODE) {
      log(`❌ React render error: ${errorMessage}`);
      log(`Stack trace: ${stackTrace}`);
      console.error('Full error object:', error);
    }
  }
} else {
  if (import.meta.env.VITE_DEBUG_MODE) {
    log('❌ Root element not found');
  }
}