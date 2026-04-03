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

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Custom CSS (cosmic/glassmorphism) |
| Routing | React Router v6 |
| HTTP | Axios |
| Payments | Stripe (Embedded Checkout) |
| Booking | Cal.com (@calcom/embed-react) |
| PDF | jsPDF + jspdf-autotable |
| Date | flatpickr |
| Location | country-state-city |
| Icons | Lucide React |
| Fonts | Playfair Display + Inter |
| Deployment | Cloudflare Pages |

## Servicii

| Serviciu | Ruta | Descriere | Status |
|----------|------|-----------|--------|
| Poziția Astrelor | `/servicii/pozitia-astrelor` | Calculator gratuit poziții planetare | ✅ Activ |
| Lumina Natală | `/servicii/lumina-natala` | Hartă natală + PDF | ✅ Activ |
| Lumina Karmică | `/servicii/lumina-karmica` | Hartă karmică + PDF | ✅ Activ |
| Consultații | `/servicii/consultatii` | Programare cu Cal.com | ✅ Activ |
| Previziuni | `/servicii/lumina-previzionala` | Tranzituri și previziuni | 🔧 În dezvoltare |
| Relațională | `/servicii/lumina-relationala` | Sinastrie și compatibilitate | 🔧 În dezvoltare |

## Configurare

### Variabile de mediu

Creează un fișier `.env` în rădăcina proiectului:

```env
VITE_NODE_ENV=development

VITE_ASTROLOGICAL_API_URL=http://localhost:3031
VITE_PAYMENT_API_URL=http://localhost:3032
VITE_BOOKING_API_URL=http://localhost:3033

VITE_STRIPE_PK=pk_test_...
```

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

### 3. Poziții Astrale
- Poziții planetare în timp real
- Transituri și aspecte curente
- Compatibilitate astrologică
- Prognoze pe termen scurt

### 4. Programări
- Sistem de rezervare online
- Integrare cu calendarul
- Confirmări automate
- Remindere pentru ședințe

## Contribuții

Suntem deschiși contribuțiilor! Te rugăm să urmezi acești pași:

1. Fork repository-ul
2. Creează un branch nou (`git checkout -b feature/îmbunătățire`)
3. Fă modificările tale
4. Rulează testele și linting-ul
5. Commit modificările (`git commit -am 'Adaugă funcționalitate nouă'`)
6. Push către branch (`git push origin feature/îmbunătățire`)
7. Creează un Pull Request

## Licență

Acest proiect este proprietate privată și nu este disponibil sub o licență open-source.

## Contact

Pentru întrebări sau colaborări, te rugăm să ne contactezi prin pagina de contact a aplicației.

