# AstroLumina 🌟

AstroLumina este o aplicație web modernă dedicată serviciilor de astrologie, oferind o platformă interactivă pentru explorarea pozițiilor astrale, crearea de hărți natale și karmice, și conectarea cu pasionații de astrologie. Construită cu accent pe accesibilitate și experiența utilizatorului, oferă un set complet de instrumente pentru atât începători cât și astrologi experimentați.

## Caracteristici

- **Hărți Natale**: Calcularea și vizualizarea hărților natale detaliate
- **Hărți Karmice**: Analiza pozițiilor karmice și a influențelor spirituale
- **Poziții Astrale**: Determinarea pozițiilor planetare în timp real
- **Programări**: Sistem de rezervări integrate cu Cal.com
- **Plăți Online**: Procesare securizată a plăților cu Stripe
- **Generare PDF**: Exportarea hărților în format PDF profesional
- **Interfață Întunecată**: Design prietenos pentru utilizare nocturnă
- **Responsive**: Optimizat complet pentru desktop și dispozitive mobile
- **Multilingv**: Suport pentru limba română și engleză

## Tehnologii Utilizate

- **Frontend**:
  - React 18 cu TypeScript pentru siguranță tipizată robustă
  - Vite pentru dezvoltare ultra-rapidă
  - Tailwind CSS pentru stilizare modernă și responsive
  - React Router v6 pentru navigare fluidă
  - Lucide React pentru iconuri moderne

- **Servicii & Integrări**:
  - Stripe pentru procesarea plăților
  - Cal.com pentru gestionarea programărilor
  - jsPDF pentru generarea documentelor PDF
  - Axios pentru cereri HTTP
  - Moment.js pentru manipularea datelor

- **Dezvoltare**:
  - ESLint pentru linting
  - PostCSS pentru procesarea CSS
  - TypeScript pentru tipizare statică
  - Cloudflare Workers pentru deployment

## Începutul Lucrului

### Cerințe Preliminare

- Node.js versiunea 22 (vezi `.nvmrc`)
- npm sau yarn

### Instalare

1. Clonează repository-ul
```bash
git clone https://github.com/username/AstroLumina.git
cd AstroLumina
```

2. Instalează dependențele
```bash
npm install
```

3. Configurează variabilele de mediu
```bash
# Creează fișierul .env cu configurațiile tale
# Vezi exemplele de variabile de mediu necesare în cod
```

4. Pornește serverul de dezvoltare
```bash
npm run dev
```

5. Construiește pentru producție
```bash
npm run build
```

6. Previzualizează build-ul de producție
```bash
npm run preview
```

## Script-uri Disponibile

- `npm run dev` - Pornește serverul de dezvoltare
- `npm run build` - Construiește pentru producție
- `npm run preview` - Previzualizează build-ul de producție
- `npm run lint` - Rulează ESLint pentru verificarea codului

## Structura Proiectului

```
AstroLumina/
├── src/
│   ├── components/                # Componente UI reutilizabile
│   │   ├── animations/            # Animații de încărcare
│   │   ├── navbar/                # Componente pentru navigare
│   │   └── scroll/                # Componente pentru scroll
│   ├── pages/                     # Pagini principale
│   │   ├── AboutMe                # Pagina "Despre mine"
│   │   ├── Contact                # Pagina de contact
│   │   ├── Events                 # Pagina evenimente
│   │   ├── NotFound               # Pagina 404
│   │   ├── Products               # Pagina produse
│   │   ├── Services               # Pagina servicii principale
│   │   └── services/              # Pagini pentru servicii detaliate
│   │       ├── AstralPositions    # Poziții astrale
│   │       ├── Bookings           # Programări
│   │       ├── KarmicChart        # Hartă karmică
│   │       ├── NatalChart         # Hartă natală
│   │       ├── astral-positions/  # Componente pentru poziții astrale
│   │       ├── bookings/          # Componente pentru programări
│   │       ├── karmic-chart/      # Componente pentru hartă karmică
│   │       ├── natal-chart/       # Componente pentru hartă natală
│   │       └── utilities/         # Funcții utilitare pentru servicii
│   ├── constants/                 # Constante (astrologie)
│   ├── contexts/                  # Context React
│   ├── styles/                    # Stiluri globale și teme
│   ├── templates/                 # Template-uri PDF
│   ├── types/                     # Definiții TypeScript
│   └── utils/                     # Funcții utilitare
└── public/                        # Assets statice
```

## Servicii Oferite

### 1. Hartă Natală
- Calcularea pozițiilor planetare la naștere
- Interpretarea aspectelor și caselor astrologice
- Generarea PDF-ului cu harta completă
- Consultanță personalizată

### 2. Hartă Karmică
- Analiza karmică detaliată
- Poziții lunare și noduri
- Interpretarea ciclurilor karmice
- Recomandări spirituale

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

