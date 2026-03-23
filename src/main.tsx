import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles/starry-theme.css';
import './styles/astronomy-fonts.css';
import 'flatpickr/dist/themes/material_blue.css';
import { LoadingProvider } from './contexts/LoadingContext';
import AstralPositions from './pages/services/AstralPositions';
import NatalChart from './pages/services/NatalChart';
import KarmicChart from './pages/services/KarmicChart';
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
            <Route path="/" element={<App />} />
            <Route path="/despre-mine" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/servicii" element={<Services />} />
            <Route path="/produse" element={<Products />} />
            <Route path="/evenimente" element={<Events />} />
            <Route path="/servicii/pozitia-astrelor" element={<AstralPositions />} />
            <Route path="/servicii/lumina-natala" element={<NatalChart />} />
            <Route path="/servicii/lumina-karmica" element={<KarmicChart />} />
            <Route path="/servicii/lumina-previzionala" element={<NotFound />} />
            <Route path="/servicii/lumina-relationala" element={<NotFound />} />
            <Route path="/servicii/consultatii" element={<Bookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LoadingProvider>
    </React.StrictMode>
  );
}
