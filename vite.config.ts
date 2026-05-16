import { defineConfig, Plugin } from "vite";
import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";

const ENV_VARS = [
  "NODE_ENV",
  "ASTROLOGY_API_SERVER_PORT",
  "ASTROLOGY_API_SERVER_DNS",
  "BOOKING_API_SERVER_PORT",
  "BOOKING_API_SERVER_DNS",
  "PAYMENT_API_SERVER_PORT",
  "PAYMENT_API_SERVER_DNS",
  "FRONTEND_SERVER_PORT",
  "FRONTEND_SERVER_DNS",
  "FRONTEND_SENTRY_DSN",
  "ASTROLOGICAL_API_URL",
  "PAYMENT_API_URL",
  "BOOKING_API_URL",
  "STRIPE_PK",
  "R2_BASE_URL",
] as const;

function envJsPlugin(): Plugin {
  return {
    name: "env-js-plugin",
    transformIndexHtml(html) {
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
        `<script>${envJsContent}</script>`
      );
    },
    closeBundle() {
      const distPath = path.resolve(__dirname, "dist", "env.js");
      const envValues: Record<string, string> = {};
      for (const key of ENV_VARS) {
        const value = process.env[key];
        if (value !== undefined) {
          envValues[key] = value;
        }
      }

      const envJsContent = `window.ENV = ${JSON.stringify(envValues, null, 2)};\n`;
      fs.writeFileSync(distPath, envJsContent);
    },
  };
}

const serverPort = parseInt(process.env.FRONTEND_SERVER_PORT || "5173", 10);

export default defineConfig({
  base: "/",
  plugins: [react(), envJsPlugin()],
  build: {
    target: "es2022",
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      external: ["dompurify"],
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react", "react-select", "react-flatpickr"],
          pdf: ["jspdf", "jspdf-autotable"],
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
