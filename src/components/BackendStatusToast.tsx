import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Ping the root endpoint — root URLs are never blocked by ad blockers.
// /health was blocked because ad-blocker filter lists flag that path pattern.
const pingBackend = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${API_BASE_URL}/`, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
};

export const BackendStatusToast = () => {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    const check = async () => {
      // First attempt
      const ok = await pingBackend();
      if (ok) return;

      // Wait 4 s and retry once — covers a slow Render cold start
      await new Promise((r) => setTimeout(r, 4000));
      const retry = await pingBackend();
      if (!retry) setVisible(true);
    };

    check();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (countdown <= 0) { window.location.reload(); return; }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [visible, countdown]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-50 flex items-start gap-3 rounded-xl border border-red-500/40 bg-black/80 backdrop-blur-md px-4 py-4 shadow-2xl max-w-xs"
        >
          <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div className="flex-1 text-sm">
            <p className="font-semibold text-white">Backend not reachable</p>
            <p className="mt-1 text-gray-400">
              The server is waking up. The page will reload automatically in{" "}
              <span className="font-bold text-red-400">{countdown}s</span>.
            </p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="mt-0.5 text-gray-500 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
