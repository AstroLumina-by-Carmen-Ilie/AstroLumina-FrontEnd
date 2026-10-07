import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),

  FRONTEND_SERVER_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "FRONTEND_SERVER_PORT is required"),

  FRONTEND_SENTRY_DSN: z.string().min(1, "FRONTEND_SENTRY_DSN is required"),

  STRIPE_PK: z.string().min(1, "STRIPE_PK is required"),
  R2_BASE_URL: z.string().min(1, "R2_BASE_URL is required"),

  ASTROLOGY_API_SERVER_DC_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "ASTROLOGY_API_SERVER_DC_PORT is required"),
  ASTROLOGY_API_SERVER_DC_DNS: z
    .string()
    .min(1, "ASTROLOGY_API_SERVER_DC_DNS is required"),
  ASTROLOGY_API_SERVER_K8S_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "ASTROLOGY_API_SERVER_K8S_PORT is required"),
  ASTROLOGY_API_SERVER_K8S_DNS: z
    .string()
    .min(1, "ASTROLOGY_API_SERVER_K8S_DNS is required"),

  BOOKING_API_SERVER_DC_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "BOOKING_API_SERVER_DC_PORT is required"),
  BOOKING_API_SERVER_DC_DNS: z
    .string()
    .min(1, "BOOKING_API_SERVER_DC_DNS is required"),
  BOOKING_API_SERVER_K8S_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "BOOKING_API_SERVER_K8S_PORT is required"),
  BOOKING_API_SERVER_K8S_DNS: z
    .string()
    .min(1, "BOOKING_API_SERVER_K8S_DNS is required"),

  PAYMENT_API_SERVER_DC_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "PAYMENT_API_SERVER_DC_PORT is required"),
  PAYMENT_API_SERVER_DC_DNS: z
    .string()
    .min(1, "PAYMENT_API_SERVER_DC_DNS is required"),
  PAYMENT_API_SERVER_K8S_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "PAYMENT_API_SERVER_K8S_PORT is required"),
  PAYMENT_API_SERVER_K8S_DNS: z
    .string()
    .min(1, "PAYMENT_API_SERVER_K8S_DNS is required"),

  FRONTEND_SERVER_DC_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "FRONTEND_SERVER_DC_PORT is required"),
  FRONTEND_SERVER_DC_DNS: z
    .string()
    .min(1, "FRONTEND_SERVER_DC_DNS is required"),
  FRONTEND_SERVER_K8S_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "FRONTEND_SERVER_K8S_PORT is required"),
  FRONTEND_SERVER_K8S_DNS: z
    .string()
    .min(1, "FRONTEND_SERVER_K8S_DNS is required"),

  ASTROLOGY_API_DC_URL: z.string().optional(),
  ASTROLOGY_API_K8S_URL: z.string().optional(),
  PAYMENT_API_DC_URL: z.string().optional(),
  PAYMENT_API_K8S_URL: z.string().optional(),
  BOOKING_API_DC_URL: z.string().optional(),
  BOOKING_API_K8S_URL: z.string().optional(),
});

type EnvConfig = z.infer<typeof envSchema> & {
  ASTROLOGY_API_URL: string;
  PAYMENT_API_URL: string;
  BOOKING_API_URL: string;
};

declare global {
  interface Window {
    ENV?: z.infer<typeof envSchema>;
  }
}

export async function initSentry(dsn: string | undefined, environment: string) {
  if (!dsn) {
    return;
  }
  const Sentry = await import("@sentry/react");
  Sentry.init({
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: environment === "production" ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

function parseAndValidateEnv(): EnvConfig {
  const rawEnv = (typeof window !== "undefined" && window.ENV) || {};

  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message).join(", ");
    const fatalError = `[ENV ERROR] ${errors}`;
    console.error(fatalError);
    throw new Error(fatalError);
  }

  // The plain *_API_URL names exist only at frontend level; their values come
  // from Doppler as per-context variants (DC for Docker Compose, K8S for
  // Kubernetes). Exactly one variant is set at runtime — prefer DC, fall back
  // to K8S.
  const data = result.data;
  return {
    ...data,
    ASTROLOGY_API_URL: resolveApiUrl(
      data.ASTROLOGY_API_DC_URL,
      data.ASTROLOGY_API_K8S_URL,
      "ASTROLOGY_API",
    ),
    PAYMENT_API_URL: resolveApiUrl(
      data.PAYMENT_API_DC_URL,
      data.PAYMENT_API_K8S_URL,
      "PAYMENT_API",
    ),
    BOOKING_API_URL: resolveApiUrl(
      data.BOOKING_API_DC_URL,
      data.BOOKING_API_K8S_URL,
      "BOOKING_API",
    ),
  };
}

function resolveApiUrl(
  dcUrl: string | undefined,
  k8sUrl: string | undefined,
  baseName: string,
): string {
  const value = dcUrl ?? k8sUrl;
  if (!value) {
    throw new Error(
      `[ENV ERROR] Either ${baseName}_DC_URL or ${baseName}_K8S_URL must be set`,
    );
  }
  return value;
}

export const env = parseAndValidateEnv();

export const NODE_ENV = env.NODE_ENV;

export const FRONTEND_SERVER_PORT = env.FRONTEND_SERVER_PORT;
export const ASTROLOGY_API_SERVER_DC_PORT = env.ASTROLOGY_API_SERVER_DC_PORT;
export const ASTROLOGY_API_SERVER_DC_DNS = env.ASTROLOGY_API_SERVER_DC_DNS;
export const ASTROLOGY_API_SERVER_K8S_PORT = env.ASTROLOGY_API_SERVER_K8S_PORT;
export const ASTROLOGY_API_SERVER_K8S_DNS = env.ASTROLOGY_API_SERVER_K8S_DNS;
export const BOOKING_API_SERVER_DC_PORT = env.BOOKING_API_SERVER_DC_PORT;
export const BOOKING_API_SERVER_DC_DNS = env.BOOKING_API_SERVER_DC_DNS;
export const BOOKING_API_SERVER_K8S_PORT = env.BOOKING_API_SERVER_K8S_PORT;
export const BOOKING_API_SERVER_K8S_DNS = env.BOOKING_API_SERVER_K8S_DNS;
export const PAYMENT_API_SERVER_DC_PORT = env.PAYMENT_API_SERVER_DC_PORT;
export const PAYMENT_API_SERVER_DC_DNS = env.PAYMENT_API_SERVER_DC_DNS;
export const PAYMENT_API_SERVER_K8S_PORT = env.PAYMENT_API_SERVER_K8S_PORT;
export const PAYMENT_API_SERVER_K8S_DNS = env.PAYMENT_API_SERVER_K8S_DNS;
export const FRONTEND_SERVER_DC_PORT = env.FRONTEND_SERVER_DC_PORT;
export const FRONTEND_SERVER_DC_DNS = env.FRONTEND_SERVER_DC_DNS;
export const FRONTEND_SERVER_K8S_PORT = env.FRONTEND_SERVER_K8S_PORT;
export const FRONTEND_SERVER_K8S_DNS = env.FRONTEND_SERVER_K8S_DNS;

export const FRONTEND_SENTRY_DSN = env.FRONTEND_SENTRY_DSN;

export const ASTROLOGY_API_URL = env.ASTROLOGY_API_URL;
export const PAYMENT_API_URL = env.PAYMENT_API_URL;
export const BOOKING_API_URL = env.BOOKING_API_URL;

export const STRIPE_PK = env.STRIPE_PK;
export const R2_BASE_URL = env.R2_BASE_URL;
