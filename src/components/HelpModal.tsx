import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, Globe, Rocket, Star, CheckCircle, AlertCircle, XCircle } from "lucide-react";

export const HelpModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating help button — bottom right */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600/80 hover:bg-indigo-500 backdrop-blur-md border border-indigo-400/40 shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Help"
        title="How to use this app"
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl shadow-2xl text-white">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a1a]/95 rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-bold tracking-wide">How to Use Cosmic Zoom Verse</h2>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-5 space-y-6 text-sm leading-relaxed">

                  {/* Section 1 */}
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                      <h3 className="font-semibold text-base text-blue-300">1 — 3D Universe Explorer (Home)</h3>
                    </div>
                    <ul className="space-y-2 text-gray-300 pl-7 list-disc">
                      <li>Use your <span className="text-white font-medium">mouse wheel</span> or <span className="text-white font-medium">pinch gesture</span> to zoom in and out between cosmic scales.</li>
                      <li><span className="text-white font-medium">Click and drag</span> to rotate and look around the scene.</li>
                      <li>Start at <span className="text-white font-medium">Earth</span>, zoom out through the <span className="text-white font-medium">Solar System</span>, and keep going to reach the <span className="text-white font-medium">Milky Way Galaxy</span>.</li>
                      <li>The scene transitions automatically as you change zoom level — each level reveals a new layer of the universe.</li>
                    </ul>
                  </section>

                  {/* Section 2 */}
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-5 h-5 text-purple-400 shrink-0" />
                      <h3 className="font-semibold text-base text-purple-300">2 — Submit an Exoplanet for Classification</h3>
                    </div>
                    <p className="text-gray-300 pl-7 mb-2">
                      Click <span className="text-white font-medium">"Exoplanet Portal"</span> from the navigation to open the prediction wizard. Fill in 4 steps:
                    </p>
                    <ol className="space-y-1 text-gray-300 pl-7 list-decimal">
                      <li><span className="text-white font-medium">Planet Identity</span> — give the planet a name.</li>
                      <li><span className="text-white font-medium">Orbital Data</span> — orbital period and transit depth.</li>
                      <li><span className="text-white font-medium">Physical Properties</span> — planet radius, stellar radius, stellar mass.</li>
                      <li><span className="text-white font-medium">Environmental Data</span> — equilibrium temperature, insolation flux, stellar temperature, and signal-to-noise ratio.</li>
                    </ol>
                    <p className="text-gray-400 pl-7 mt-2">
                      After submitting, the AI model instantly classifies the candidate and shows a confidence score with a full probability breakdown.
                    </p>
                  </section>

                  {/* Section 3 */}
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-yellow-400 shrink-0" />
                      <h3 className="font-semibold text-base text-yellow-300">3 — My Planets Collection</h3>
                    </div>
                    <ul className="space-y-2 text-gray-300 pl-7 list-disc">
                      <li>Click <span className="text-white font-medium">"My Planets"</span> in the navigation to see all the exoplanet candidates you have submitted.</li>
                      <li>Each card shows the planet name, classification badge, orbital period, radius, temperature, and transit depth.</li>
                      <li>Click <span className="text-white font-medium">any planet card</span> to view its full details and probability breakdown.</li>
                      <li>Use the <span className="text-white font-medium">delete button</span> on a card to remove it from your collection.</li>
                    </ul>
                  </section>

                  {/* Section 4 */}
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                      <h3 className="font-semibold text-base text-green-300">4 — Understanding Classification Results</h3>
                    </div>
                    <div className="pl-7 space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-green-900/20 border border-green-500/20">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-green-300">CONFIRMED</p>
                          <p className="text-gray-400">The object has been verified as a real planet orbiting another star.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-900/20 border border-yellow-500/20">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-yellow-300">CANDIDATE</p>
                          <p className="text-gray-400">The transit signal looks planetary but needs additional follow-up observations to confirm.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-900/20 border border-red-500/20">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-red-300">FALSE POSITIVE</p>
                          <p className="text-gray-400">The signal is not caused by a planet — likely an eclipsing binary star or instrument noise.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 5 */}
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-5 h-5 text-gray-400 shrink-0" />
                      <h3 className="font-semibold text-base text-gray-300">5 — Tips</h3>
                    </div>
                    <ul className="space-y-2 text-gray-400 pl-7 list-disc">
                      <li>If the page shows a <span className="text-white font-medium">"Backend not reachable"</span> message, wait for the countdown — the server is waking up from sleep (Render free tier). The page reloads automatically.</li>
                      <li>All submitted planets are saved on the server and will still be there after a page refresh.</li>
                      <li>The AI model was trained on <span className="text-white font-medium">~9,000 Kepler Objects of Interest</span> from the NASA Exoplanet Archive with over 95% accuracy.</li>
                    </ul>
                  </section>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 text-center text-xs text-gray-600">
                  Powered by NASA Kepler data · LightGBM + XGBoost stacking ensemble
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
