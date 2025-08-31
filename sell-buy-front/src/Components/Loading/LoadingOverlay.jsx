import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingOverlay({ text = "XXX" }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center space-y-4 text-white"
      >
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="text-lg font-semibold">{text}</p>
      </motion.div>
    </div>
  );
}
