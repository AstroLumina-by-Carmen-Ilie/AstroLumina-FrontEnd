# AstroLumina

Servicii profesionale de astrologie — hărți natale, hărți karmice, consultații și previziuni personalizate.

## Arhitectură

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

## Servicii

| Serviciu            | Ruta                                   | Descriere                            | Status           |
| ------------------- | -------------------------------------- | ------------------------------------ | ---------------- |
| Calculatorul Astral | `/servicii/calculatorul-astral`        | Calculator gratuit poziții planetare | ✅ Activ         |
| Lumina Natală       | `/astrograma/lumina-natala-si-karmica` | Hartă natală + PDF                   | ✅ Activ         |
| Lumina Karmică      | `/servicii/lumina-karmica`             | Hartă karmică + PDF                  | ✅ Activ         |
| Consultații         | `/servicii/consultatii`                | Programare cu Cal.com                | ✅ Activ         |
| Previziuni          | `/astrograma/lumina-previzionala`      | Tranzituri și previziuni             | 🔧 În dezvoltare |
| Relațională         | `/astrograma/lumina-relationala`       | Sinastrie și compatibilitate         | 🔧 În dezvoltare |

## Configurare

### Variabile de mediu

Creează un fișier `.env` în rădăcina proiectului:

```env
NODE_ENV=development|staging|production

ASTROLOGY_API_SERVER_PORT=3031
ASTROLOGY_API_SERVER_DNS=localhost
BOOKING_API_SERVER_PORT=3033
BOOKING_API_SERVER_DNS=localhost
PAYMENT_API_SERVER_PORT=3032
PAYMENT_API_SERVER_DNS=localhost
FRONTEND_SERVER_PORT=5173
FRONTEND_SERVER_DNS=localhost

ASTROLOGICAL_API_URL=http://localhost:3031
PAYMENT_API_URL=http://localhost:3032
BOOKING_API_URL=http://localhost:3033

STRIPE_PK=<stripe-pk>

FRONTEND_SENTRY_DSN=<sentry-dsn>

R2_BASE_URL=https://pub-xxx.r2.dev
```

Toate variabilele sunt obligatorii (fara valori default). App-ul va esua la pornire daca lipsesc.

### Instalare

```bash
npm install
```

### Dezvoltare

```bash
npm run dev
```

### Build producție

```bash
npm run build
npm run preview
```

## Structura API-urilor

### AstrologyAPI (3031)

- `POST /api/v2/:lang/birth-data` — Date complete naștere
- `POST /api/v2/:lang/astral-data` — Date astrale filtrate
- `POST /api/v2/:lang/astral-data/:type` — Date filtrate pe tip (natal/karmic)
- `POST /api/v2/:lang/astral-chart` — SVG hartă astrologică
- `GET /health` — Health check

### PaymentAPI (3032)

- `POST /create-checkout-session/:product` — Creare sesiune checkout Stripe
- `GET /session-status?session_id=` — Verificare status plată
- `GET /products` — Lista produse disponibile
- `GET /health` — Health check

### BookingAPI (3033)

- `GET /api/event-types` — Tipuri de evenimente Cal.com
- `GET /api/bookings` — Lista rezervări
- `POST /api/bookings` — Creare rezervare
- `GET /api/availability/slots` — Sloturi disponibile
- `GET /health` — Health check

## Design System

- **Culori primare:** Cosmic Purple (#7C3AED) + Gold (#CA8A04)
- **Background:** Midnight Dark (#0a0a1a)
- **Fonturi:** Playfair Display (headings) + Inter (body)
- **Stil:** Glassmorphism cu cosmic effects
- **Animații:** Shooting stars, floating particles, shimmer effects

## Securitate

- Nu expune niciodată chei secrete (`STRIPE_SK`) în codul frontend
- Toate cheile secrete aparțin backend-urilor
- CORS este configurat pe fiecare API
- Rate limiting este activat pe API-uri
