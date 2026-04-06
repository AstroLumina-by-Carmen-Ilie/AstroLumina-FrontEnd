import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles/starry-theme.css';
import './styles/astronomy-fonts.css';
import 'flatpickr/dist/themes/material_blue.css';
import { LoadingProvider } from './contexts/LoadingContext';
import AstralCalculator from './pages/services/AstralCalculator';
import NatalChart from './pages/services/NatalChart';
import KarmicChart from './pages/services/KarmicChart';
import SynastryChart from './pages/services/SynastryChart';
import PredictiveChart from './pages/services/PredictiveChart';
import MoonPhaseCalculator from './pages/services/MoonPhaseCalculator';
import Bookings from './pages/services/Bookings';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Products from './pages/Products';
import Events from './pages/Events';
import NotFound from './pages/NotFound';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LoadingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AstralCalculator />} />
            <Route path="/despre-mine" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/servicii" element={<NotFound />} />
            <Route path="/produse" element={<NotFound />} />
            <Route path="/evenimente" element={<NotFound />} />
            <Route path="/servicii/calculatorul-astral" element={<NotFound />} />
            <Route path="/servicii/calculatorul-fazei-lunare" element={<NotFound />} />
            <Route path="/servicii/lumina-natala" element={<NotFound />} />
            <Route path="/servicii/lumina-karmica" element={<NotFound />} />
            <Route path="/servicii/lumina-relationala" element={<NotFound />} />
            <Route path="/servicii/lumina-previzionala" element={<NotFound />} />
            <Route path="/servicii/consultatii" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LoadingProvider>
    </React.StrictMode>
  );
}
