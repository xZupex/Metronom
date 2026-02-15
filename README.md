# TypeScript App

Eine moderne TypeScript Anwendung mit vollständigem Setup.

## 📦 Installation

```bash
npm install
```

## 🚀 Scripts

- **`npm run dev`** - Startet die App mit Hot-Reload für Development
- **`npm run build`** - Kompiliert TypeScript zu JavaScript
- **`npm start`** - Startet die kompilierte App
- **`npm run lint`** - Führt ESLint aus
- **`npm run format`** - Formatiert Code mit Prettier
- **`npm test`** - Führt Tests aus

## 📂 Projektstruktur

```
.
├── src/              # Source Code
│   ├── index.ts      # Entry Point
│   └── __tests__/    # Test Dateien
├── dist/             # Kompilierter JavaScript Code
├── package.json      # Dependencies & Scripts
├── tsconfig.json     # TypeScript Konfiguration
├── jest.config.js    # Testing Konfiguration
├── .eslintrc.json    # Linting Konfiguration
└── .prettierrc        # Formatierungs-Konfiguration
```

## 🛠️ Entwicklung

### Neue Dateien erstellen

Erstelle neue TypeScript Dateien in `src/`:

```typescript
// src/utils.ts
export const add = (a: number, b: number): number => a + b;
```

### Tests schreiben

```typescript
// src/__tests__/utils.test.ts
import { add } from '../utils';

describe('add function', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

## ✨ Tipps

- TypeScript wird in `dist/` kompiliert
- Verwende `npm run dev` während der Entwicklung für Live-Reload
- Führe `npm run lint` aus, um Code-Qualität zu verbessern
- Schreibe Tests für deine Funktionen

Viel Erfolg! 🎉
