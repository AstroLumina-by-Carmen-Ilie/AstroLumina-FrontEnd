#!/bin/sh
for file in /usr/share/nginx/html/env.js /usr/share/nginx/html/index.html; do
  sed -i "s|__NODE_ENV__|${NODE_ENV}|g" "$file"
  sed -i "s|__ASTROLOGY_API_SERVER_PORT__|${ASTROLOGY_API_SERVER_PORT}|g" "$file"
  sed -i "s|__ASTROLOGY_API_SERVER_DNS__|${ASTROLOGY_API_SERVER_DNS}|g" "$file"
  sed -i "s|__BOOKING_API_SERVER_PORT__|${BOOKING_API_SERVER_PORT}|g" "$file"
  sed -i "s|__BOOKING_API_SERVER_DNS__|${BOOKING_API_SERVER_DNS}|g" "$file"
  sed -i "s|__PAYMENT_API_SERVER_PORT__|${PAYMENT_API_SERVER_PORT}|g" "$file"
  sed -i "s|__PAYMENT_API_SERVER_DNS__|${PAYMENT_API_SERVER_DNS}|g" "$file"
  sed -i "s|__FRONTEND_SERVER_PORT__|${FRONTEND_SERVER_PORT}|g" "$file"
  sed -i "s|__FRONTEND_SERVER_DNS__|${FRONTEND_SERVER_DNS}|g" "$file"
  sed -i "s|__FRONTEND_SENTRY_DSN__|${FRONTEND_SENTRY_DSN}|g" "$file"
  sed -i "s|__ASTROLOGICAL_API_URL__|${ASTROLOGICAL_API_URL}|g" "$file"
  sed -i "s|__PAYMENT_API_URL__|${PAYMENT_API_URL}|g" "$file"
  sed -i "s|__BOOKING_API_URL__|${BOOKING_API_URL}|g" "$file"
  sed -i "s|__STRIPE_PK__|${STRIPE_PK}|g" "$file"
  sed -i "s|__R2_BASE_URL__|${R2_BASE_URL}|g" "$file"
done

exec nginx -g "daemon off;"
