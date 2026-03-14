import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

const BackButton = ({ onClick, ariaLabel = "Voltar" }: BackButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      aria-label={ariaLabel}
    >
      <ChevronLeft className="w-6 h-6" />
    </motion.button>
  );
};

export default BackButton;
