import * as Sentry from "@sentry/react";

const envSchema = z.object({
  ASTROLOGICAL_API_URL: z.string().min(1, "ASTROLOGICAL_API_URL is required"),
  PAYMENT_API_URL: z.string().min(1, "PAYMENT_API_URL is required"),
  BOOKING_API_URL: z.string().min(1, "BOOKING_API_URL is required"),
  STRIPE_PK: z.string().min(1, "STRIPE_PK is required"),
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  FRONTEND_SENTRY_DSN: z.string().min(1, "FRONTEND_SENTRY_DSN is required"),
  R2_BASE_URL: z.string().min(1, "R2_BASE_URL is required"),
});

type EnvConfig = z.infer<typeof envSchema>;

declare global {
  interface Window {
    ENV?: EnvConfig;
  }
}

function initSentry(dsn?: string, environment: string) {
  if (dsn) {
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

// Initialize Sentry with validated config
initSentry(env.FRONTEND_SENTRY_DSN, env.NODE_ENV);

// Export validated config
export const ASTROLOGICAL_API_URL = env.ASTROLOGICAL_API_URL;
export const PAYMENT_API_URL = env.PAYMENT_API_URL;
export const BOOKING_API_URL = env.BOOKING_API_URL;
export const STRIPE_PK = env.STRIPE_PK;
export const NODE_ENV = env.NODE_ENV;
export const R2_BASE_URL = env.R2_BASE_URL;