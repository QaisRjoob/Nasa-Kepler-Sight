<div align="center">

# Cosmic Zoom Verse: Exoplanet Explorer

**An interactive 3D space explorer with an AI exoplanet classifier, built at the NASA Space Apps hackathon**

Fly from Earth to the edge of the Milky Way, enter the measurements of a Kepler Object of Interest (KOI),
and get a real-time classification (**confirmed planet**, **candidate** or **false positive**) from a
machine learning model trained on NASA's Kepler data.

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-0.160-000000?logo=threedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)

**[🌐 Live demo](https://nasa-kepler-sight.onrender.com)** ·
[Backend repo](https://github.com/QaisRjoob/exoplanet-classifier-BackEnd) ·
[Screenshots](#-screenshots) ·
[Architecture](#-architecture) ·
[Quick start](#-quick-start)

</div>

<p align="center">
  <img src="docs/screenshots/galaxy-view.jpg" alt="Galaxy view of Cosmic Zoom Verse" width="100%">
</p>

---

## Table of contents

1. [Live demo](#-live-demo)
2. [Overview](#-overview)
3. [Screenshots](#-screenshots)
4. [Features](#-features)
5. [Tech stack](#-tech-stack)
6. [Architecture](#-architecture)
7. [Prediction flow](#-prediction-flow)
8. [Project structure](#-project-structure)
9. [Quick start](#-quick-start)
10. [Deploy to Render](#-deploy-to-render)
11. [Team](#-team)
12. [Data source](#-data-source)

---

## 🌐 Live demo

| What | Link |
|---|---|
| **Web app** | https://nasa-kepler-sight.onrender.com |
| **Backend API** | https://nasa-kepler-sight-backend.onrender.com |
| Backend source | https://github.com/QaisRjoob/exoplanet-classifier-BackEnd |

> Hosted on Render's free plan: the backend sleeps after a period without traffic. The app shows a
> countdown toast while it wakes up and reloads itself when the API is ready.

---

## 📌 Overview

NASA's Kepler Space Telescope watched more than 150,000 stars and flagged thousands of **Kepler Objects
of Interest**: stars whose light dips as if a planet were crossing in front of them. Most of these turn
out to be false positives.

Cosmic Zoom Verse is the visual front end of a classification system that answers *"is this a planet?"*
for a new candidate. The 3D scenes make the scale of the problem tangible, and the prediction portal
sends the measurements to a **LightGBM + XGBoost stacking ensemble** served by a FastAPI backend.

| Concept | Meaning |
|---|---|
| **KOI** | A Kepler Object of Interest: a star with a transit-like signal |
| **Confirmed** | Verified as a real exoplanet |
| **Candidate** | Looks planetary, still needs follow-up observations |
| **False positive** | The signal is not caused by a planet (for example an eclipsing binary) |

---

## 📸 Screenshots

<table>
  <tr>
    <th>Solar system</th>
    <th>Confirmed planets</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/solar-system.jpg" alt="3D solar system view"></td>
    <td><img src="docs/screenshots/confirmed-planets.jpg" alt="Grid of confirmed exoplanets"></td>
  </tr>
</table>

<p align="center">
  <b>Exoplanet prediction portal</b><br>
  <img src="docs/screenshots/prediction-portal.jpg" alt="Exoplanet prediction portal wizard" width="90%">
</p>

---

## ✨ Features

**3D exploration**
- Seven views from one navigation bar: Earth, Solar System, Galaxy, Universe, Exoplanet, My Planets and Test Data
- Built with Three.js through React Three Fiber and Drei, with smooth camera transitions between scales
- Info panels with real facts for each object, plus a carousel of recent discoveries

**Exoplanet prediction portal** (`/exoplanet`)
- A four-step wizard: planet identity, orbital data, physical properties, environmental data
- Single-planet entry or CSV upload for many planets at once
- The result shows the predicted class, the confidence and the probability of all three classes

**My Planets** (`/my-planets`)
- Every classified planet is saved with its badge, orbital period, radius, temperature and transit depth
- Open the details of a planet or delete it

**Resilience**
- A typed API client with a `localStorage` fallback when the backend is unreachable
- A status toast pings `/health` on load and counts down while a sleeping backend wakes up

---

## 🧰 Tech stack

| Layer | Technologies |
|---|---|
| Language and build | TypeScript 5.8, Vite 5 |
| UI | React 18, Tailwind CSS, shadcn/ui (Radix UI), Framer Motion |
| 3D | Three.js, React Three Fiber, Drei |
| Data | TanStack Query 5, React Hook Form + Zod |
| Routing and charts | React Router 6, Recharts |
| Backend (separate repo) | Python, FastAPI, LightGBM, XGBoost, scikit-learn |
| Hosting | Render (static site + web service) |

---

## 🏗️ Architecture

The frontend follows a small MVC-style split: **pages and components** render, a **controller** owns
the calls and the offline fallback, and a typed **API client** talks to the backend.

```mermaid
flowchart LR
    subgraph Browser["Browser (React + Vite)"]
        Pages["Pages<br/>Index · ExoplanetPage · MyPlanetsPage"]
        Scenes["3D scenes<br/>Three.js / React Three Fiber"]
        Controller["ExoplanetController"]
        Client["Typed API client<br/>lib/api.ts"]
        Cache[("localStorage<br/>fallback")]
        Pages --> Scenes
        Pages --> Controller
        Controller --> Client
        Controller -. backend offline .-> Cache
    end

    subgraph Render["Render"]
        API["FastAPI backend"]
        Model[["Stacking ensemble<br/>LightGBM + XGBoost"]]
        Store[("Saved planets<br/>JSON files")]
        API --> Model
        API --> Store
    end

    Client -- "HTTPS / JSON" --> API
```

---

## 🔭 Prediction flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Prediction wizard
    participant C as ExoplanetController
    participant API as FastAPI backend
    participant M as Stacking model

    User->>UI: Enter KOI measurements (4 steps)
    UI->>C: Validate with Zod and submit
    C->>API: POST /planets/predict-and-save
    API->>M: predict_proba(features)
    M-->>API: Probabilities for 3 classes
    API-->>C: Label, confidence, probabilities, saved id
    C-->>UI: Show the result card
    UI-->>User: CONFIRMED / CANDIDATE / FALSE POSITIVE
    Note over C,API: If the API is unreachable, the controller<br/>keeps the planet in localStorage instead
```

---

## 📂 Project structure

```text
src/
├── App.tsx                     # Routes and global providers
├── pages/
│   ├── Index.tsx               # 3D universe view
│   ├── ExoplanetPage.tsx       # Prediction wizard
│   ├── MyPlanetsPage.tsx       # Saved planets
│   └── ModelMetricsPage.tsx    # Model metrics
├── components/
│   ├── ExoplanetDataEntry.tsx  # Multi-step prediction form
│   ├── MyPlanets.tsx           # Planet collection grid
│   ├── BackendStatusToast.tsx  # Wake-up countdown for the backend
│   ├── SolarSystem.tsx · GalaxyView.tsx · Earth.tsx   # 3D scenes
│   └── ui/                     # shadcn/ui primitives
├── controllers/
│   └── ExoplanetController.ts  # API calls with the localStorage fallback
├── lib/api.ts                  # Typed client for every backend endpoint
└── models/ExoplanetModel.ts    # Types and validation
```

---

## 🚀 Quick start

**Requirements:** Node.js 18+ (or Bun).

```bash
git clone https://github.com/QaisRjoob/Nasa-Kepler-Sight.git
cd Nasa-Kepler-Sight
npm install
cp .env.example .env        # set VITE_API_URL to your backend
npm run dev                 # http://localhost:8080
```

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | Base URL of the [backend](https://github.com/QaisRjoob/exoplanet-classifier-BackEnd) |

Build for production with `npm run build` (output in `dist/`).

---

## 🚢 Deploy to Render

The repository includes a `render.yaml` blueprint for a **static site**: build with
`bun install && bun run build`, publish `./dist`, and rewrite every route to `/index.html`. Set
`VITE_API_URL` to the backend's Render URL.

---

## 👥 Team

Built in a team of four at the **NASA Space Apps** hackathon.

| Name | GitHub |
|---|---|
| Qais Rjoob | [@QaisRjoob](https://github.com/QaisRjoob) |
| Mohammed Nnimer | [@mohammednnimer](https://github.com/mohammednnimer) |
| Laith | [@laithw2](https://github.com/laithw2) |
| Baraa | [@Baraa-Rj](https://github.com/Baraa-Rj) |

---

## 📚 Data source

[NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/): Kepler Objects of Interest,
cumulative table.

---

<div align="center">

Frontend: [Nasa-Kepler-Sight](https://github.com/QaisRjoob/Nasa-Kepler-Sight) ·
Backend: [exoplanet-classifier-BackEnd](https://github.com/QaisRjoob/exoplanet-classifier-BackEnd)

</div>
