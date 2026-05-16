# =============================================================================
# AstroLumina Frontend - Dockerfile cu Nginx
# =============================================================================

FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runner

RUN mkdir -p \
  /var/cache/nginx/client_temp \
  /var/cache/nginx/proxy_temp \
  /var/cache/nginx/fastcgi_temp \
  /var/cache/nginx/uwsgi_temp \
  /var/cache/nginx/scgi_temp

COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint-astrolumina.sh
RUN chmod +x /docker-entrypoint-astrolumina.sh \
  && rm -f /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx \
  /usr/share/nginx/html \
  /var/cache/nginx
EXPOSE 80

CMD ["/docker-entrypoint-astrolumina.sh"]