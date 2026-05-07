# Cosmic Zoom Verse — Exoplanet Explorer Frontend

An interactive 3D space explorer that lets you navigate from Earth to the edge of the Milky Way, submit exoplanet candidate data, and receive real-time classifications powered by the KOI machine learning model.

Built with React, Three.js, and Tailwind CSS.

---

## Live Demo

> **Frontend App:** https://nasa-kepler-sight.onrender.com
> **Backend API:** https://nasa-kepler-sight-backend.onrender.com

---

## Team

This project was built collaboratively by:

| Name | GitHub |
|------|--------|
| Qais Rjoob | [@QaisRjoob](https://github.com/QaisRjoob) |
| Mohammed Nnimer | [@mohammednnimer](https://github.com/mohammednnimer) |
| Laith | [@laithw2](https://github.com/laithw2) |
| Baraa | [@Baraa-Rj](https://github.com/Baraa-Rj) |

---

## About the Project

The NASA Kepler Space Telescope collected data on over 150,000 stars over nine years. From this data, thousands of Kepler Objects of Interest (KOIs) were identified — objects whose light curves suggest a planet might be passing in front of the star. However, most of these candidates turn out to be false positives.

**Cosmic Zoom Verse** is the visual interface to a machine learning classification system that takes KOI measurements and predicts whether a candidate is a confirmed planet, still a candidate, or a false positive. The application presents this in an immersive 3D environment to make the science accessible and visually compelling.

---

## The Frontend

### User Flows

**1. Exoplanet Prediction Portal (`/exoplanet`)**

A step-by-step wizard where users enter KOI measurements across four stages:
- Planet identity (name)
- Orbital data (period, transit depth)
- Physical properties (planet radius, stellar radius, stellar mass)
- Environmental data (equilibrium temperature, insolation flux, stellar temperature, SNR)

On submission, the data is sent to the backend `/planets/predict-and-save` endpoint. The response includes the predicted class (CONFIRMED / CANDIDATE / FALSE POSITIVE), a confidence percentage, and a probability breakdown for all three classes.

**2. My Planets Collection (`/my-planets`)**

A grid view of all previously submitted and classified planets. Each card shows the planet name, classification badge, orbital period, radius, temperature, and transit depth. Users can view the full details of any planet or delete it from their collection.

**3. 3D Universe View (`/`)**

An interactive 3D scene rendered with Three.js and React Three Fiber showing Earth, the solar system, exoplanet systems, and a galaxy view. Users can zoom between scales to explore different levels of the universe.

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Language | TypeScript |
| Framework | React 18 |
| Build tool | Vite |
| 3D rendering | Three.js, React Three Fiber, Drei |
| Styling | Tailwind CSS |
| UI components | shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion |
| Data fetching | TanStack Query |
| Routing | React Router v6 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |

---

## Project Structure

```
src/
├── App.tsx                         # Root: routes and global providers
├── pages/
│   ├── Index.tsx                   # Main 3D universe view
│   ├── ExoplanetPage.tsx           # Prediction wizard page
│   ├── MyPlanetsPage.tsx           # Saved planets page
│   └── NotFound.tsx
├── components/
│   ├── ExoplanetDataEntry.tsx      # Multi-step prediction form
│   ├── MyPlanets.tsx               # Planet collection grid
│   ├── BackendStatusToast.tsx      # Connection status notification
│   ├── SpaceBackground3D.tsx       # Three.js canvas
│   ├── SolarSystem.tsx             # 3D solar system scene
│   ├── GalaxyView.tsx              # 3D galaxy scene
│   ├── Dashboard.tsx               # Model metrics dashboard
│   ├── ModelTraining.tsx           # Training controls and progress
│   └── ui/                         # shadcn/ui base components
├── controllers/
│   └── ExoplanetController.ts      # API calls with localStorage fallback
├── lib/
│   └── api.ts                      # Typed API client for all backend endpoints
├── models/
│   └── ExoplanetModel.ts           # Data types and validation
└── hooks/
    └── use-toast.ts
```

---

## Backend Connection

This frontend connects to the [Exoplanet Classifier Backend](https://github.com/QaisRjoob/exoplanet-classifier-BackEnd).

The API base URL is configured via the `VITE_API_URL` environment variable:

```env
VITE_API_URL=https://your-backend-name.onrender.com
```

If the variable is not set, it defaults to `http://localhost:8000` for local development.

### Backend Status Toast

When the app loads, it pings the backend `/health` endpoint. If the backend is unreachable (for example, waking up from Render's free tier sleep), a notification appears in the bottom-right corner:

- Displays a live countdown from 50 seconds
- Automatically reloads the page when the countdown reaches 0
- Can be dismissed manually

---

## Running Locally

### Prerequisites

- Node.js 18+ or Bun

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/QaisRjoob/Nasa-exoplanet-explorer-cosmic-zoom-verse.git
cd Nasa-exoplanet-explorer-cosmic-zoom-verse

# 2. Install dependencies
npm install
# or
bun install

# 3. Create environment file
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend URL

# 4. Start the development server
npm run dev
# or
bun dev
```

App available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

Output goes to `dist/`.

---

## Deploying to Render

This repository includes a `render.yaml` file. To deploy:

1. Push the repository to GitHub
2. Go to [render.com](https://render.com) → New Static Site
3. Connect this repository
4. Render will detect `render.yaml` and configure the build automatically
5. Set the environment variable `VITE_API_URL` to your backend Render URL

---

## Related Repository

**Backend — Exoplanet Classifier API**  
[github.com/QaisRjoob/exoplanet-classifier-BackEnd](https://github.com/QaisRjoob/exoplanet-classifier-BackEnd)

---

## Data Source

NASA Exoplanet Archive — Kepler Objects of Interest cumulative table  
[exoplanetarchive.ipac.caltech.edu](https://exoplanetarchive.ipac.caltech.edu/)
