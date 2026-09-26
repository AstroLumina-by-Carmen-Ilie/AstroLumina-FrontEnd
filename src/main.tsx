import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@/App";
import "./styles/starry-theme.css";
import "./styles/astronomy-fonts.css";
import "flatpickr/dist/themes/material_blue.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { env, initSentry } from "@/config";

// Route-level code splitting: fiecare pagina devine un chunk separat,
// incarcat la cerere. Fara asta, toate paginile + country-state-city +
// stripe + jspdf ajungeau intr-un singur chunk de ~10MB.
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

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-midnight-950">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-cosmic-500/30 border-t-cosmic-400" />
    </div>
  );
}

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
              <Route path="/" element={<App />} />
              <Route path="/despre-mine" element={<AboutMe />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/servicii" element={<Services />} />
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
                element={<NatalNKarmicChartBooking />}
              />
              <Route
                path="/astrograma/lumina-relationala"
                element={<SynastryChartBooking />}
              />
              <Route
                path="/astrograma/lumina-previzionala"
                element={<PredictiveChartBooking />}
              />
              {/* Produse */}
              <Route path="/produse" element={<Products />} />
              <Route
                path="/produse/ghidul-lui-saturn-in-berbec"
                element={<GhidulLuiSaturnInBerbec />}
              />
              <Route
                path="/produse/soarele-stralucirea-ta"
                element={<SoareleStralucireaTa />}
              />
              {/* Evenimente */}
              <Route path="/evenimente" element={<Events />} />
              <Route
                path="/evenimente/rezervare/:id"
                element={<ConstellationEvent />}
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
