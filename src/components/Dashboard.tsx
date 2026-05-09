import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Target, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Exoplanet {
  id: number;
  name: string;
  type: string;
  discovered: string;
  status: "confirmed" | "candidate" | "false-positive";
  color: string;
}

export const Dashboard = () => {
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const [falsePositiveCount, setFalsePositiveCount] = useState(0);

  useEffect(() => {
    // Check for user uploaded data
    const uploadedData = localStorage.getItem("uploadedExoplanets");
    
    if (uploadedData) {
      try {
        const exoplanets: Exoplanet[] = JSON.parse(uploadedData);
        const confirmed = exoplanets.filter(p => p.status === "confirmed").length;
        const candidate = exoplanets.filter(p => p.status === "candidate").length;
        const falsePositive = exoplanets.filter(p => p.status === "false-positive").length;
        
        setConfirmedCount(confirmed);
        setCandidateCount(candidate);
        setFalsePositiveCount(falsePositive);
      } catch (error) {
        console.error("Error parsing exoplanet data:", error);
      }
    }

    // Listen for storage changes (when data is uploaded)
    const handleStorageChange = () => {
      const data = localStorage.getItem("uploadedExoplanets");
      if (data) {
        try {
          const exoplanets: Exoplanet[] = JSON.parse(data);
          setConfirmedCount(exoplanets.filter(p => p.status === "confirmed").length);
          setCandidateCount(exoplanets.filter(p => p.status === "candidate").length);
          setFalsePositiveCount(exoplanets.filter(p => p.status === "false-positive").length);
        } catch (error) {
          console.error("Error parsing exoplanet data:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const stats = [
    { label: "Confirmed",      value: confirmedCount,    color: "text-blue-400",  glow: "cosmic-glow",         icon: Database, shadow: "hover:shadow-purple-500/20" },
    { label: "Candidates",     value: candidateCount,    color: "text-green-400", glow: "text-green-400",      icon: Target,   shadow: "hover:shadow-green-500/20"  },
    { label: "False Positives",value: falsePositiveCount,color: "text-red-400",   glow: "text-red-400",        icon: XCircle,  shadow: "hover:shadow-red-500/20"    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-4 left-2 right-2 sm:top-8 sm:left-8 sm:right-auto z-20"
    >
      {/* ── DESKTOP: horizontal scroll row (unchanged) ── */}
      <div className="hidden sm:flex gap-4">
        {stats.map(({ label, value, color, glow, icon: Icon, shadow }) => (
          <Card key={label} className={`bg-card/80 backdrop-blur-lg border-border/50 shadow-2xl ${shadow} transition-all duration-300 w-[200px] shrink-0`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${glow}`}>{value > 0 ? value.toLocaleString() : "-"}</div>
              <p className="text-[10px] text-muted-foreground mt-1">{value > 0 ? "From your data" : "No data yet"}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── MOBILE: compact 3-column pill grid ── */}
      <div className="flex sm:hidden gap-2">
        {stats.map(({ label, value, color, icon: Icon }) => (
          <div
            key={label}
            className="flex-1 flex flex-col items-center gap-1 px-2 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <Icon className={`w-4 h-4 ${color}`} />
            <span className={`text-base font-bold leading-none ${color}`}>
              {value > 0 ? value.toLocaleString() : "—"}
            </span>
            <span className="text-[8px] text-gray-500 font-medium text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
