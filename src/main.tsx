import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@/App";
import "./styles/starry-theme.css";
import "./styles/astronomy-fonts.css";
import "flatpickr/dist/themes/material_blue.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import NotFound from "@/pages/NotFound";
import AboutMe from "@/pages/AboutMe";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import AstralCalculator from "@/pages/services/AstralCalculator";
import MoonPhaseCalculator from "@/pages/services/MoonPhaseCalculator";
import NatalChart from "@/pages/previews/NatalChart";
import KarmicChart from "@/pages/previews/KarmicChart";
import NatalNKarmicChartBooking from "@/pages/bookings/NatalNKarmicChartBooking";
import SynastryChartBooking from "@/pages/bookings/SynastryChartBooking";
import PredictiveChartBooking from "@/pages/bookings/PredictiveChartBooking";
import Products from "@/pages/Products";
import GhidulLuiSaturnInBerbec from "@/pages/products/GhidulLuiSaturnInBerbec";
import SoareleStralucireaTa from "@/pages/products/SoareleStralucireaTa";
import Events from "@/pages/Events";
import ConstellationEvent from "@/pages/events/ConstellationEvent";

const rootElement = document.getElementById("root");

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
            {/* Calculators */}
            <Route
              path="/servicii/calculatorul-astral"
              element={<NotFound />}
            />
            <Route
              path="/servicii/calculatorul-fazei-lunare"
              element={<NotFound />}
            />
            {/* Previews */}
            <Route
              path="/servicii/calculator-lumina-natala"
              element={<NotFound />}
            />
            <Route
              path="/servicii/calculator-lumina-karmica"
              element={<NotFound />}
            />
            {/* Astrograme */}
            <Route
              path="/astrograma/lumina-natala-si-karmica"
              element={<NotFound />}
            />
            <Route
              path="/astrograma/lumina-relationala"
              element={<NotFound />}
            />
            <Route
              path="/astrograma/lumina-previzionala"
              element={<NotFound />}
            />
            {/* Produse */}
            <Route path="/produse" element={<NotFound />} />
            <Route
              path="/produse/ghidul-lui-saturn-in-berbec"
              element={<NotFound />}
            />
            <Route
              path="/produse/soarele-stralucirea-ta"
              element={<NotFound />}
            />
            {/* Evenimente */}
            <Route path="/evenimente" element={<NotFound />} />
            <Route path="/evenimente/rezervare/:id" element={<NotFound />} />
            {/*  */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LoadingProvider>
    </React.StrictMode>,
  );
}
