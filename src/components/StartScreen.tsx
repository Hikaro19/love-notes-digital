import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ANIMATION_TIMINGS } from "@/constants/animations";
import bgInicial from "@/assets/photos/bg-inicial.jpg";

interface StartScreenProps {
  onEnter: () => void;
}

const StartScreen = ({ onEnter }: StartScreenProps) => {
  // Respect user's motion preferences
  const prefersReducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <div className="relative min-h-screen overflow-y-auto flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgInicial})` }}
      />
      <div className="gallery-overlay" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ANIMATION_TIMINGS.CARD_APPEAR_DURATION, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        <motion.div
          animate={
            prefersReducedMotion 
              ? {} 
              : { y: [0, -ANIMATION_TIMINGS.HEART_FLOAT_AMPLITUDE, 0] }
          }
          transition={
            prefersReducedMotion 
              ? {} 
              : { duration: ANIMATION_TIMINGS.HEART_FLOAT_DURATION, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Heart className="h-16 w-16 text-primary fill-primary opacity-80" />
        </motion.div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-sm">
          Para você 🤍
        </h1>

        <p className="text-lg text-white/80 font-body max-w-xs">
          Preparei uma surpresinha especial...
        </p>

        <motion.button
          onClick={onEnter}
          className="btn-romantic mt-4"
          whileTap={{ scale: 0.95 }}
        >
          Abrir presente
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartScreen;
