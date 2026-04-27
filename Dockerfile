# =============================================================================
# AstroLumina Frontend - Dockerfile cu Nginx
# =============================================================================

# ─────────────────────────────────────────────────────────────────────────────
# Stage 1: Builder
# Instalează dependențele și compilează aplicația React/Vite.
# Acest stage nu intră în imaginea finală - doar outputul lui (dist/).
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
# node:22-alpine = Node.js 22 pe Alpine Linux (~5MB vs ~900MB pentru ubuntu).
# Spre deosebire de API-uri, frontenddul nu are nevoie de stage separat "deps"
# deoarece tot ce produce (dist/) e static - node_modules nu merg în producție.

WORKDIR /app
# Toate comenzile următoare rulează relativ la /app în interiorul containerului.

# Copiem DOAR manifestele, nu tot codul sursă.
# Avantaj: Docker cache - dacă package.json nu s-a schimbat,
# acest layer e cache-uit și npm ci nu mai rulează la rebuild.
COPY package.json package-lock.json ./

# npm ci = instalare strictă bazată pe package-lock.json (reproducibilă).
# Instalăm TOATE dependențele (inclusiv dev) deoarece Vite și plugin-urile
# sale sunt devDependencies dar sunt necesare pentru build.
RUN npm ci

# Copiem tot codul sursă (src/, public/, index.html, vite.config.ts, etc.)
COPY . .

# Rulează scriptul "build" din package.json (vite build).
# React/TypeScript → JavaScript/CSS/HTML optimizat și minificat în dist/
# Rezultatul e complet static - nu necesită Node.js la runtime.
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: Production Runner
# Imaginea finală bazată pe Nginx - un web server ultra-eficient pentru
# servirea fișierelor statice. Node.js nu e prezent în această imagine.
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:alpine AS runner
# nginx:alpine = Nginx pe Alpine Linux.
# Mult mai potrivit decât node:alpine pentru fișiere statice:
# Nginx e optimizat pentru throughput ridicat, caching, compresie gzip,
# și poate servi mii de request-uri concurente cu consum minim de resurse.

# Înlocuiește configurația default a Nginx cu cea custom a proiectului.
# nginx.conf poate conține: rewrite rules pentru React Router (SPA fallback),
# headers de securitate (CSP, HSTS), compresie gzip, cache headers pentru assets.
COPY nginx.conf /etc/nginx/nginx.conf

# Copiază outputul compilat din Stage 1 în directorul default al Nginx.
# /usr/share/nginx/html = locul unde Nginx servește fișierele statice.
# Node.js, node_modules și codul sursă .tsx NU ajung în imaginea finală.
COPY --from=builder /app/dist /usr/share/nginx/html

# Dăm ownership fișierelor statice userului "nginx" (creat automat de imaginea nginx:alpine).
# Necesar deoarece COPY --from=... copiază fișierele cu owner root.
RUN chown -R nginx:nginx /usr/share/nginx/html

# Rulăm Nginx ca user non-root pentru securitate.
# Dacă aplicația e compromisă, atacatorul nu are privilegii de root pe host.
# Nginx poate asculta pe portul 80 chiar și ca non-root în acest context
# deoarece procesul master (care bind-uiește portul) e pornit separat.
USER nginx

# Documentează că containerul ascultă pe portul 80 (HTTP standard).
# Nu deschide efectiv portul - asta o face Render sau docker run -p 80:80
EXPOSE 80

# Healthcheck: verifică periodic dacă Nginx răspunde corect.
# --interval=30s  = verifică la fiecare 30 de secunde
# --timeout=3s    = dacă nu răspunde în 3s, consideră verificarea eșuată
# --start-period=5s = așteaptă 5s după start înainte de prima verificare
# --retries=3     = după 3 eșecuri consecutive, containerul e marcat "unhealthy"
# wget spider     = face un HTTP HEAD request fără a descărca conținutul
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Pornește Nginx în foreground (daemon off).
# "daemon off" e obligatoriu în Docker: dacă Nginx ar rula ca daemon
# (background), procesul principal s-ar termina și Docker ar opri containerul.
# Formă array (exec form) = procesul Nginx primește semnalele OS direct
# (SIGTERM, SIGINT) pentru graceful shutdown, fără shell intermediar.
CMD ["nginx", "-g", "daemon off;"]