import { defineConfig, Plugin } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_VARS = [
  "NODE_ENV",
  "FRONTEND_SERVER_PORT",
  "FRONTEND_SENTRY_DSN",
  "STRIPE_PK",
  "R2_BASE_URL",
  "ASTROLOGY_API_SERVER_DC_PORT",
  "ASTROLOGY_API_SERVER_DC_DNS",
  "ASTROLOGY_API_SERVER_K8S_PORT",
  "ASTROLOGY_API_SERVER_K8S_DNS",
  "BOOKING_API_SERVER_DC_PORT",
  "BOOKING_API_SERVER_DC_DNS",
  "BOOKING_API_SERVER_K8S_PORT",
  "BOOKING_API_SERVER_K8S_DNS",
  "PAYMENT_API_SERVER_DC_PORT",
  "PAYMENT_API_SERVER_DC_DNS",
  "PAYMENT_API_SERVER_K8S_PORT",
  "PAYMENT_API_SERVER_K8S_DNS",
  "FRONTEND_SERVER_DC_PORT",
  "FRONTEND_SERVER_DC_DNS",
  "FRONTEND_SERVER_K8S_PORT",
  "FRONTEND_SERVER_K8S_DNS",
  "ASTROLOGY_API_DC_URL",
  "ASTROLOGY_API_K8S_URL",
  "PAYMENT_API_DC_URL",
  "PAYMENT_API_K8S_URL",
  "BOOKING_API_DC_URL",
  "BOOKING_API_K8S_URL",
] as const;

function hasEnvVars(): boolean {
  return ENV_VARS.filter((k) => k !== "NODE_ENV").some(
    (key) => process.env[key] !== undefined,
  );
}

function envJsPlugin(): Plugin {
  return {
    name: "env-js-plugin",
    transformIndexHtml(html) {
      if (!hasEnvVars()) {
        return html;
      }

      let result = html;
      for (const key of ENV_VARS) {
        const value = process.env[key];
        if (value !== undefined) {
          result = result.replaceAll(`__${key}__`, value);
        }
      }

      const envValues: Record<string, string> = {};
      for (const key of ENV_VARS) {
        const value = process.env[key];
        if (value !== undefined) {
          envValues[key] = value;
        }
      }

      const envJsContent = `window.ENV = ${JSON.stringify(envValues, null, 2)};`;

      return result.replace(
        '<script src="/env.js"></script>',
        `<script>${envJsContent}</script>`,
      );
    },
    closeBundle() {
      const distPath = path.resolve(__dirname, "dist", "env.js");
      fs.mkdirSync(path.dirname(distPath), { recursive: true });
      const envValues: Record<string, string> = {};
      for (const key of ENV_VARS) {
        const value = process.env[key];
        if (value !== undefined) {
          envValues[key] = value;
        }
      }

      const content = hasEnvVars()
        ? `window.ENV = ${JSON.stringify(envValues, null, 2)};\n`
        : `window.ENV = {
  NODE_ENV: "__NODE_ENV__",
  FRONTEND_SERVER_PORT: "__FRONTEND_SERVER_PORT__",
  FRONTEND_SENTRY_DSN: "__FRONTEND_SENTRY_DSN__",
  STRIPE_PK: "__STRIPE_PK__",
  R2_BASE_URL: "__R2_BASE_URL__",
  ASTROLOGY_API_SERVER_DC_PORT: "__ASTROLOGY_API_SERVER_DC_PORT__",
  ASTROLOGY_API_SERVER_DC_DNS: "__ASTROLOGY_API_SERVER_DC_DNS__",
  ASTROLOGY_API_SERVER_K8S_PORT: "__ASTROLOGY_API_SERVER_K8S_PORT__",
  ASTROLOGY_API_SERVER_K8S_DNS: "__ASTROLOGY_API_SERVER_K8S_DNS__",
  BOOKING_API_SERVER_DC_PORT: "__BOOKING_API_SERVER_DC_PORT__",
  BOOKING_API_SERVER_DC_DNS: "__BOOKING_API_SERVER_DC_DNS__",
  BOOKING_API_SERVER_K8S_PORT: "__BOOKING_API_SERVER_K8S_PORT__",
  BOOKING_API_SERVER_K8S_DNS: "__BOOKING_API_SERVER_K8S_DNS__",
  PAYMENT_API_SERVER_DC_PORT: "__PAYMENT_API_SERVER_DC_PORT__",
  PAYMENT_API_SERVER_DC_DNS: "__PAYMENT_API_SERVER_DC_DNS__",
  PAYMENT_API_SERVER_K8S_PORT: "__PAYMENT_API_SERVER_K8S_PORT__",
  PAYMENT_API_SERVER_K8S_DNS: "__PAYMENT_API_SERVER_K8S_DNS__",
  FRONTEND_SERVER_DC_PORT: "__FRONTEND_SERVER_DC_PORT__",
  FRONTEND_SERVER_DC_DNS: "__FRONTEND_SERVER_DC_DNS__",
  FRONTEND_SERVER_K8S_PORT: "__FRONTEND_SERVER_K8S_PORT__",
  FRONTEND_SERVER_K8S_DNS: "__FRONTEND_SERVER_K8S_DNS__",
  ASTROLOGY_API_DC_URL: "__ASTROLOGY_API_DC_URL__",
  ASTROLOGY_API_K8S_URL: "__ASTROLOGY_API_K8S_URL__",
  PAYMENT_API_DC_URL: "__PAYMENT_API_DC_URL__",
  PAYMENT_API_K8S_URL: "__PAYMENT_API_K8S_URL__",
  BOOKING_API_DC_URL: "__BOOKING_API_DC_URL__",
  BOOKING_API_K8S_URL: "__BOOKING_API_K8S_URL__",
};
`;

      fs.writeFileSync(distPath, content);
    },
  };
}

const serverPort = parseInt(process.env.FRONTEND_SERVER_PORT || "5173", 10);

export default defineConfig({
  base: "/",
  plugins: [react(), envJsPlugin()],
  build: {
    target: "es2022",
    minify: "oxc",
    sourcemap: false,
    // Initial bundle is ~170 kB; chunks above the default 500 kB limit are
    // all lazy-loaded on demand (geo dataset, PDF engine, error tracking).
    chunkSizeWarningLimit: 9000,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "vendor",
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            },
            {
              name: "forms-data",
              test: /[\\/]node_modules[\\/]country-state-city[\\/]lib[\\/](state|city)\.js/,
            },
            {
              name: "stripe",
              test: /[\\/]node_modules[\\/](@stripe)[\\/]/,
            },
            {
              name: "sentry",
              test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
            },
            {
              name: "pdf",
              test: /[\\/]node_modules[\\/](jspdf|jspdf-autotable|html2canvas)[\\/]/,
            },
          ],
        },
      },
    },
  },
  server: {
    port: serverPort,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@templates": path.resolve(__dirname, "./src/templates"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
});
