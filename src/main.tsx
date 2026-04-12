import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/App';
import './styles/starry-theme.css';
import './styles/astronomy-fonts.css';
import 'flatpickr/dist/themes/material_blue.css';
import { LoadingProvider } from '@/contexts/LoadingContext';
import AstralCalculator from '@/pages/services/AstralCalculator';
import MoonPhaseCalculator from '@/pages/services/MoonPhaseCalculator';
import NatalChart from '@/pages/previews/NatalChart';
import KarmicChart from '@/pages/previews/KarmicChart';
import NatalNKarmicChartBooking from '@/pages/bookings/NatalNKarmicChartBooking';
import SynastryChartBooking from '@/pages/bookings/SynastryChartBooking';
import PredictiveChartBooking from '@/pages/bookings/PredictiveChartBooking';
import AboutMe from '@/pages/AboutMe';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import Products from '@/pages/Products';
import Events from '@/pages/Events';
import NotFound from '@/pages/NotFound';

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
            <Route path="/servicii/calculator-lumina-natala" element={<NotFound />} />
            <Route path="/servicii/calculator-lumina-karmica" element={<NotFound />} />
            <Route path="/astrograma/lumina-natala-si-karmica" element={<NotFound />} />
            <Route path="/astrograma/lumina-relationala" element={<NotFound />} />
            <Route path="/astrograma/lumina-previzionala" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LoadingProvider>
    </React.StrictMode>
  );
}
