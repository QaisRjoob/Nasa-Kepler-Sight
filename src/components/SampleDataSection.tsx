import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, ChevronDown, ChevronUp } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const NASA_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative";

const CATEGORIES = [
  {
    label: "Quick Tests",
    color: "blue",
    files: [
      { name: "sample_small_test.csv",        rows: 5,   desc: "Quick smoke test — 5 rows, mixed classes" },
      { name: "sample_single_prediction.csv", rows: 1,   desc: "Single row for one-shot prediction" },
      { name: "sample_batch_prediction.csv",  rows: 20,  desc: "20 rows for batch prediction testing" },
    ],
  },
  {
    label: "By Classification",
    color: "purple",
    files: [
      { name: "sample_confirmed_planets.csv", rows: 10, desc: "Confirmed planets only" },
      { name: "sample_candidate_planets.csv", rows: 10, desc: "Candidate signals only" },
      { name: "sample_false_positives.csv",   rows: 10, desc: "False positives only" },
    ],
  },
  {
    label: "Balanced Sets",
    color: "green",
    files: [
      { name: "sample_mixed_balanced.csv",  rows: 30,  desc: "Balanced across all 3 classes" },
      { name: "sample_multi_balanced.csv",  rows: 60,  desc: "Double-size balanced set" },
      { name: "sample_random_diverse.csv",  rows: 50,  desc: "50 randomly diverse KOI objects" },
      { name: "sample_high_confidence.csv", rows: 30,  desc: "30 high-confidence predictions" },
      { name: "sample_large_test.csv",      rows: 100, desc: "100 rows for performance testing" },
    ],
  },
  {
    label: "Planet Types",
    color: "orange",
    files: [
      { name: "sample_earth_like.csv",    rows: 30, desc: "Earth-like planet candidates" },
      { name: "sample_super_earths.csv",  rows: 30, desc: "Super-Earth candidates" },
      { name: "sample_hot_jupiters.csv",  rows: 25, desc: "Hot Jupiter candidates" },
      { name: "sample_mini_neptunes.csv", rows: 30, desc: "Mini-Neptune candidates" },
      { name: "sample_cool_planets.csv",  rows: 30, desc: "Cool / cold-zone planets" },
    ],
  },
  {
    label: "Orbital & Stellar",
    color: "pink",
    files: [
      { name: "sample_short_period.csv",    rows: 30, desc: "Short orbital period objects" },
      { name: "sample_long_period.csv",     rows: 30, desc: "Long orbital period objects" },
      { name: "sample_transit_variety.csv", rows: 30, desc: "Varied transit depths" },
      { name: "sample_sun_like_stars.csv",  rows: 30, desc: "KOIs orbiting Sun-like stars" },
    ],
  },
  {
    label: "Special Cases",
    color: "red",
    files: [
      { name: "sample_edge_cases.csv",    rows: 10, desc: "Borderline / edge-case signals" },
      { name: "sample_extreme_cases.csv", rows: 20, desc: "Extreme parameter values" },
      { name: "sample_key_features.csv",  rows: 20, desc: "Key model feature examples" },
    ],
  },
];

const COLOR = {
  blue:   { pill: "bg-blue-500/20 text-blue-300 border-blue-500/30",   btn: "hover:bg-blue-500/20 hover:text-blue-300" },
  purple: { pill: "bg-purple-500/20 text-purple-300 border-purple-500/30", btn: "hover:bg-purple-500/20 hover:text-purple-300" },
  green:  { pill: "bg-green-500/20 text-green-300 border-green-500/30",  btn: "hover:bg-green-500/20 hover:text-green-300" },
  orange: { pill: "bg-orange-500/20 text-orange-300 border-orange-500/30", btn: "hover:bg-orange-500/20 hover:text-orange-300" },
  pink:   { pill: "bg-pink-500/20 text-pink-300 border-pink-500/30",    btn: "hover:bg-pink-500/20 hover:text-pink-300" },
  red:    { pill: "bg-red-500/20 text-red-300 border-red-500/30",       btn: "hover:bg-red-500/20 hover:text-red-300" },
} as const;

export const SampleDataSection = () => {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const download = async (filename: string) => {
    setDownloading(filename);
    try {
      const res = await fetch(`${API_BASE_URL}/data/samples/${filename}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Could not download file — make sure the backend is running.");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-8 pb-12"
    >
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-lg overflow-hidden">
        {/* Header / toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-purple-400" />
            <div className="text-left">
              <p className="font-semibold text-white">Sample Data Files</p>
              <p className="text-xs text-gray-400 mt-0.5">
                23 ready-to-use CSV files for testing the prediction API
              </p>
            </div>
          </div>
          {open ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {open && (
          <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-5">
            {/* NASA source link */}
            <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <div>
                <p className="text-sm font-semibold text-indigo-300">NASA Exoplanet Archive — Source Data</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Official Kepler Objects of Interest cumulative table used to train the model
                </p>
              </div>
              <a
                href={NASA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/70 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open NASA Archive
              </a>
            </div>

            {/* File categories */}
            {CATEGORIES.map((cat) => {
              const c = COLOR[cat.color as keyof typeof COLOR];
              return (
                <div key={cat.label}>
                  <p className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${c.pill}`}>
                    {cat.label}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.files.map((f) => (
                      <div
                        key={f.name}
                        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-white font-medium truncate">{f.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{f.desc} · {f.rows} row{f.rows !== 1 ? "s" : ""}</p>
                        </div>
                        <button
                          onClick={() => download(f.name)}
                          disabled={downloading === f.name}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 text-xs font-medium transition-colors shrink-0 ${c.btn} disabled:opacity-50`}
                          title={`Download ${f.name}`}
                        >
                          <Download className={`w-3.5 h-3.5 ${downloading === f.name ? "animate-bounce" : ""}`} />
                          {downloading === f.name ? "..." : "Download"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};
