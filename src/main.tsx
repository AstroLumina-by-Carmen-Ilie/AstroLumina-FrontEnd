import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@/App";
import "./styles/starry-theme.css";
import "./styles/astronomy-fonts.css";
import "flatpickr/dist/themes/material_blue.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import RouteFallback from "@/components/RouteFallback";
import { env, initSentry } from "@/config";

// Route-level code splitting: each page becomes a separate chunk,
// loaded on demand. Without this, all pages + country-state-city +
// stripe + jspdf ended up in a single ~10MB chunk.
const NotFound = lazy(() => import("@/pages/NotFound"));
const AboutMe = lazy(() => import("@/pages/AboutMe"));
const Contact = lazy(() => import("@/pages/Contact"));
const Services = lazy(() => import("@/pages/Services"));
const AstralCalculator = lazy(
  () => import("@/pages/services/AstralCalculator"),
);
const MoonPhaseCalculator = lazy(
  () => import("@/pages/services/MoonPhaseCalculator"),
);
const NatalNKarmicChartBooking = lazy(
  () => import("@/pages/bookings/NatalNKarmicChartBooking"),
);
const SynastryChartBooking = lazy(
  () => import("@/pages/bookings/SynastryChartBooking"),
);
const PredictiveChartBooking = lazy(
  () => import("@/pages/bookings/PredictiveChartBooking"),
);
const Products = lazy(() => import("@/pages/Products"));
const GhidulLuiSaturnInBerbec = lazy(
  () => import("@/pages/products/GhidulLuiSaturnInBerbec"),
);
const SoareleStralucireaTa = lazy(
  () => import("@/pages/products/SoareleStralucireaTa"),
);
const Events = lazy(() => import("@/pages/Events"));
const ConstellationEvent = lazy(
  () => import("@/pages/events/ConstellationEvent"),
);

const rootElement = document.getElementById("root");

void initSentry(env.FRONTEND_SENTRY_DSN, env.NODE_ENV);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LoadingProvider>
        <Router>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<NotFound />} />
              <Route path="/despre-mine" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              <Route path="/servicii" element={<NotFound />} />
              {/* Calculators */}
              <Route
                path="/servicii/calculatorul-astral"
                element={<AstralCalculator />}
              />
              <Route
                path="/servicii/calculatorul-fazei-lunare"
                element={<MoonPhaseCalculator />}
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
              <Route
                path="/evenimente/rezervare/:id"
                element={<NotFound />}
              />
              {/*  */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </LoadingProvider>
    </React.StrictMode>,
  );
}
