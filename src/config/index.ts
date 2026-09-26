import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),

  ASTROLOGY_API_SERVER_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "ASTROLOGY_API_SERVER_PORT is required"),
  ASTROLOGY_API_SERVER_DNS: z
    .string()
    .min(1, "ASTROLOGY_API_SERVER_DNS is required"),

  BOOKING_API_SERVER_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "BOOKING_API_SERVER_PORT is required"),
  BOOKING_API_SERVER_DNS: z
    .string()
    .min(1, "BOOKING_API_SERVER_DNS is required"),

  PAYMENT_API_SERVER_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "PAYMENT_API_SERVER_PORT is required"),
  PAYMENT_API_SERVER_DNS: z
    .string()
    .min(1, "PAYMENT_API_SERVER_DNS is required"),

  FRONTEND_SERVER_PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "FRONTEND_SERVER_PORT is required"),
  FRONTEND_SERVER_DNS: z.string().min(1, "FRONTEND_SERVER_DNS is required"),

  FRONTEND_SENTRY_DSN: z.string().min(1, "FRONTEND_SENTRY_DSN is required"),

  ASTROLOGICAL_API_URL: z.string().min(1, "ASTROLOGICAL_API_URL is required"),
  PAYMENT_API_URL: z.string().min(1, "PAYMENT_API_URL is required"),
  BOOKING_API_URL: z.string().min(1, "BOOKING_API_URL is required"),

  STRIPE_PK: z.string().min(1, "STRIPE_PK is required"),
  R2_BASE_URL: z.string().min(1, "R2_BASE_URL is required"),
});

type EnvConfig = z.infer<typeof envSchema>;

declare global {
  interface Window {
    ENV?: EnvConfig;
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

  return result.data;
}

export const env = parseAndValidateEnv();

export const NODE_ENV = env.NODE_ENV;

export const ASTROLOGY_API_SERVER_PORT = env.ASTROLOGY_API_SERVER_PORT;
export const ASTROLOGY_API_SERVER_DNS = env.ASTROLOGY_API_SERVER_DNS;
export const BOOKING_API_SERVER_PORT = env.BOOKING_API_SERVER_PORT;
export const BOOKING_API_SERVER_DNS = env.BOOKING_API_SERVER_DNS;
export const PAYMENT_API_SERVER_PORT = env.PAYMENT_API_SERVER_PORT;
export const PAYMENT_API_SERVER_DNS = env.PAYMENT_API_SERVER_DNS;
export const FRONTEND_SERVER_PORT = env.FRONTEND_SERVER_PORT;
export const FRONTEND_SERVER_DNS = env.FRONTEND_SERVER_DNS;

export const FRONTEND_SENTRY_DSN = env.FRONTEND_SENTRY_DSN;

export const ASTROLOGICAL_API_URL = env.ASTROLOGICAL_API_URL;
export const PAYMENT_API_URL = env.PAYMENT_API_URL;
export const BOOKING_API_URL = env.BOOKING_API_URL;

export const STRIPE_PK = env.STRIPE_PK;
export const R2_BASE_URL = env.R2_BASE_URL;
