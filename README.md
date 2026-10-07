# AstroLumina

Professional astrology services — natal charts, karmic charts, consultations and personalized forecasts.

## Architecture

```
AstroLumina/
├── AstroLumina-Frontend/       # React SPA (port 5173)
├── AstroLumina-AstrologyAPI/   # Express API (port 3031)
├── AstroLumina-PaymentAPI/     # Stripe API (port 3032)
└── AstroLumina-BookingAPI/     # Cal.com API (port 3033)
```

## Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Frontend   | React 18 + TypeScript + Vite                     |
| Styling    | Tailwind CSS + Custom CSS (cosmic/glassmorphism) |
| Routing    | React Router v6                                  |
| HTTP       | Axios                                            |
| Payments   | Stripe (Embedded Checkout)                       |
| Booking    | Cal.com (@calcom/embed-react)                    |
| PDF        | jsPDF + jspdf-autotable                          |
| Date       | flatpickr                                        |
| Location   | country-state-city                               |
| Icons      | Lucide React                                     |
| Fonts      | Playfair Display + Inter                         |
| Deployment | Cloudflare Pages                                 |

## Configuration

### Environment variables

Create an `.env` file in the project root:

```env
NODE_ENV=development|staging|production

FRONTEND_SERVER_PORT=5173

FRONTEND_SENTRY_DSN=<sentry-dsn>

STRIPE_PK=<stripe-pk>

R2_BASE_URL=https://pub-xxx.r2.dev

ASTROLOGY_API_SERVER_DC_PORT=3031
ASTROLOGY_API_SERVER_DC_DNS=localhost
ASTROLOGY_API_SERVER_K8S_PORT=3031
ASTROLOGY_API_SERVER_K8S_DNS=localhost
BOOKING_API_SERVER_DC_PORT=3033
BOOKING_API_SERVER_DC_DNS=localhost
BOOKING_API_SERVER_K8S_PORT=3033
BOOKING_API_SERVER_K8S_DNS=localhost
PAYMENT_API_SERVER_DC_PORT=3032
PAYMENT_API_SERVER_DC_DNS=localhost
PAYMENT_API_SERVER_K8S_PORT=3032
PAYMENT_API_SERVER_K8S_DNS=localhost
FRONTEND_SERVER_DC_PORT=5173
FRONTEND_SERVER_DC_DNS=localhost
FRONTEND_SERVER_K8S_PORT=5173
FRONTEND_SERVER_K8S_DNS=localhost

ASTROLOGY_API_URL=http://localhost:3031
PAYMENT_API_URL=http://localhost:3032
BOOKING_API_URL=http://localhost:3033
```

The app fails at startup if the required variables are missing (no default values).

### API base URLs

The frontend calls the backends through `ASTROLOGY_API_URL`,
`PAYMENT_API_URL` and `BOOKING_API_URL`:

- In the Docker Compose context, `docker-compose.yml` maps each of them to
  its `*_API_DC_URL` counterpart, so the three values always follow the
  Compose endpoints.
- For external hosting — e.g. frontend on Cloudflare with APIs on Render —
  set the three `*_API_URL` variables directly to the public API addresses.

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

## API structure

### AstrologyAPI (3031)

- `POST /api/v2/:lang/birth-data` — Full birth data
- `POST /api/v2/:lang/astral-data` — Filtered astral data
- `POST /api/v2/:lang/astral-data/:type` — Data filtered by type (natal/karmic)
- `POST /api/v2/:lang/astral-chart` — Astrology chart SVG
- `GET /health` — Health check

### PaymentAPI (3032)

- `POST /create-checkout-session/:product` — Create Stripe checkout session
- `GET /session-status?session_id=` — Check payment status
- `GET /products` — List available products
- `GET /health` — Health check

### BookingAPI (3033)

- `GET /api/event-types` — Cal.com event types
- `GET /api/bookings` — List bookings
- `POST /api/bookings` — Create booking
- `GET /api/availability/slots` — Available slots
- `GET /health` — Health check

## Design System

- **Primary colors:** Cosmic Purple (#7C3AED) + Gold (#CA8A04)
- **Background:** Midnight Dark (#0a0a1a)
- **Fonts:** Playfair Display (headings) + Inter (body)
- **Style:** Glassmorphism with cosmic effects
- **Animations:** Shooting stars, floating particles, shimmer effects

## Security

- Never expose secret keys (`STRIPE_SK`) in frontend code
- All secret keys belong to the backends
- CORS is configured on each API
- Rate limiting is enabled on the APIs
