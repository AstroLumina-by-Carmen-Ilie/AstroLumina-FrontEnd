// Dummy browser environment for unit tests. Assign window.ENV (for its side
// effect) before dynamically importing any src module: config/index.ts reads
// window.ENV at load and throws when a required variable is missing.
export const DC_DNS = "dc.test.local";
export const K8S_DNS = "k8s.test.local";

export const DUMMY_ENV: Record<string, string> = {
  NODE_ENV: "development",

  FRONTEND_SERVER_PORT: "80",
  FRONTEND_SENTRY_DSN: "https://abc123@o0.ingest.sentry.io/0",
  STRIPE_PK: "pk_test_dummy",
  R2_BASE_URL: "https://r2.test.local",

  ASTROLOGY_API_SERVER_DC_PORT: "3031",
  ASTROLOGY_API_SERVER_DC_DNS: DC_DNS,
  ASTROLOGY_API_SERVER_K8S_PORT: "3131",
  ASTROLOGY_API_SERVER_K8S_DNS: K8S_DNS,

  BOOKING_API_SERVER_DC_PORT: "3033",
  BOOKING_API_SERVER_DC_DNS: DC_DNS,
  BOOKING_API_SERVER_K8S_PORT: "3133",
  BOOKING_API_SERVER_K8S_DNS: K8S_DNS,

  PAYMENT_API_SERVER_DC_PORT: "3032",
  PAYMENT_API_SERVER_DC_DNS: DC_DNS,
  PAYMENT_API_SERVER_K8S_PORT: "3132",
  PAYMENT_API_SERVER_K8S_DNS: K8S_DNS,

  FRONTEND_SERVER_DC_PORT: "8080",
  FRONTEND_SERVER_DC_DNS: DC_DNS,
  FRONTEND_SERVER_K8S_PORT: "8180",
  FRONTEND_SERVER_K8S_DNS: K8S_DNS,

  ASTROLOGY_API_URL: "https://dc.test.local:3031",
  PAYMENT_API_URL: "https://dc.test.local:3032",
  BOOKING_API_URL: "https://dc.test.local:3033",
};

(globalThis as { window?: unknown }).window = { ENV: DUMMY_ENV };
