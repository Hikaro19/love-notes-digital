import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface StartScreenProps {
  onEnter: () => void;
}

const StartScreen = ({ onEnter }: StartScreenProps) => {
  return (
    <div className="romantic-gradient-bg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-16 w-16 text-primary fill-primary opacity-80" />
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground drop-shadow-sm">
          Para você 🤍
        </h1>

        <p className="text-lg text-muted-foreground font-body max-w-xs">
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
