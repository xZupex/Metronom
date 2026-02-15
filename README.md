# 🎵 Metronom App

Eine moderne TypeScript Metronom Anwendung mit verschiedenen Taktarten und Sound-Optionen.

## 🎯 Features

- ✅ Verschiedene Taktarten: 1/4, 2/4, 3/4, 4/4, 3/8, 6/8, 12/8, 5/4, 7/8, Triplet
- 🔊 4 verschiedene Sound-Optionen: Beep, Ping, Bell, Click
- 📊 Visuelle Beat-Indikatoren
- ⚡ Echtzeitänderungen während des Abspielens
- 🎚️ Tempo von 40-300 BPM einstellbar
- 🎨 Responsive Design

## 🚀 Live Demo

Die App läuft live auf: **https://USERNAME.github.io/metronom-app/**

(Ersetze USERNAME mit deinem GitHub-Benutzernamen)

## 💻 Lokal Entwickeln

### Voraussetzungen
- Node.js (v20+)
- npm (v9+)

### Installation

```bash
# Dependencies installieren
npm install --legacy-peer-deps

# Development Server starten (Port 8000)
npm run dev
```

### Befehle

- **`npm run dev`** - Development Server mit Hot-Reload
- **`npm run build`** - Produktions-Build
- **`npm run lint`** - Code-Qualität prüfen
- **`npm run format`** - Code formatieren
- **`npm test`** - Tests ausführen

## 🛠️ Technologie

- **TypeScript** - Typsicherheit
- **Web Audio API** - Soundgenerierung
- **esbuild** - Schnelles Bundling
- **ESLint & Prettier** - Code-Qualität
- **Jest** - Testing Framework

## 📁 Projektstruktur

```
.
├── src/
│   ├── index.ts         # Hauptlogik (Metronom Klasse)
│   ├── index.html       # HTML Template
│   ├── styles.css       # Styling
│   └── __tests__/       # Tests
├── dist/                # Compiled Output (wird deployed)
├── .github/workflows/   # GitHub Actions
├── package.json         # Dependencies & Scripts
└── tsconfig.json        # TypeScript Config
```

## 🌐 GitHub Pages Deployment

Die App wird automatisch deployed wenn du Code zu `main` pushst:

```bash
# 1. Repository klonen
git clone https://github.com/USERNAME/metronom-app.git

# 2. Dependencies installieren
cd metronom-app
npm install --legacy-peer-deps

# 3. Änderungen machen und committen
git add .
git commit -m "Feature: xyz"

# 4. Zu GitHub pushen
git push origin main
```

GitHub Actions baut automatisch die App und deployed sie zu GitHub Pages! ✨

## 🔧 Anpassungen

Wenn du eine Custom Domain verwenden möchtest:

1. Gehe zu Repository Settings → Pages
2. Unter "Custom domain" gib deine Domain ein
3. Aktualisiere deine DNS-Records (siehe GitHub Pages Dokumentation)

## 📝 Lizenz

MIT

---

**Viel Spaß mit deinem Metronom! 🎶**

