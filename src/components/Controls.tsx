import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ViewState } from "./SpaceJourney";
import { Globe, Orbit, Sparkles, Boxes, Telescope, Eye, FlaskConical, Download, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const NASA_URL =
  "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative";

const SAMPLE_FILES = [
  { name: "sample_small_test.csv",     rows: 5,   label: "Small Test",     desc: "5 rows — quick smoke test" },
  { name: "sample_mixed_balanced.csv", rows: 30,  label: "Mixed Balanced", desc: "30 rows — all 3 classes" },
  { name: "sample_large_test.csv",     rows: 100, label: "Large Test",     desc: "100 rows — stress test" },
];

interface ControlsProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Controls = ({ currentView, onViewChange }: ControlsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const download = async (filename: string) => {
    setDownloading(filename);
    try {
      const res = await fetch(`${API_BASE_URL}/data/samples/${filename}`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Could not download — make sure the backend is running.");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-3 p-4 bg-card/80 backdrop-blur-lg rounded-full border border-border shadow-lg">
          <Button
            variant={currentView === "earth" ? "default" : "outline"}
            size="lg"
            onClick={() => onViewChange("earth")}
            className="gap-2 transition-all hover:scale-105"
          >
            <Globe className="w-5 h-5" />
            Earth
          </Button>

          <Button
            variant={currentView === "solar" ? "default" : "outline"}
            size="lg"
            onClick={() => onViewChange("solar")}
            className="gap-2 transition-all hover:scale-105"
          >
            <Orbit className="w-5 h-5" />
            Solar System
          </Button>

          <Button
            variant={currentView === "galaxy" ? "default" : "outline"}
            size="lg"
            onClick={() => onViewChange("galaxy")}
            className="gap-2 transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Galaxy
          </Button>

          <Button
            variant={currentView === "universe" ? "default" : "outline"}
            size="lg"
            onClick={() => onViewChange("universe")}
            className="gap-2 transition-all hover:scale-105"
          >
            <Boxes className="w-5 h-5" />
            Universe
          </Button>

          <Button
            variant={currentView === "exoplanet" ? "default" : "outline"}
            size="lg"
            onClick={() => onViewChange("exoplanet")}
            className="gap-2 transition-all hover:scale-105"
          >
            <Telescope className="w-5 h-5" />
            Exoplanet
          </Button>

          <Button
            variant={currentView === "planet-details" ? "default" : "outline"}
            size="lg"
            onClick={() => onViewChange("planet-details")}
            className="gap-2 transition-all hover:scale-105"
          >
            <Eye className="w-5 h-5" />
            My Planet
          </Button>

          {/* Test Data button */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => setModalOpen(true)}
            className="gap-2 transition-all hover:scale-105 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200"
          >
            <FlaskConical className="w-5 h-5" />
            Test Data
          </Button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl shadow-2xl text-white overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-purple-400" />
                    <h2 className="font-bold text-lg">Test with Data</h2>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5">

                  {/* Option 1 — Download sample */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-300">
                      Download a ready-made sample file
                    </p>
                    <p className="text-xs text-gray-500">
                      Formatted CSV files ready to use with the prediction endpoint.
                    </p>
                    <div className="space-y-2">
                      {SAMPLE_FILES.map((f) => (
                        <button
                          key={f.name}
                          onClick={() => download(f.name)}
                          disabled={downloading === f.name}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-purple-500/15 border border-white/5 hover:border-purple-500/30 transition-all text-left group disabled:opacity-60"
                        >
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors">
                              {f.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                          </div>
                          <Download
                            className={`w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors shrink-0 ml-3 ${
                              downloading === f.name ? "animate-bounce text-purple-400" : ""
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 text-gray-600 text-xs">
                    <div className="flex-1 h-px bg-white/10" />
                    or get real NASA data
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Option 2 — NASA link */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-300">
                      NASA Exoplanet Archive
                    </p>
                    <p className="text-xs text-gray-500">
                      The official Kepler KOI table — the same dataset used to train this model.
                    </p>
                    <a
                      href={NASA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-400/40 transition-all group"
                    >
                      <span className="text-sm font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors">
                        Open NASA Exoplanet Archive
                      </span>
                      <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0 ml-3" />
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
