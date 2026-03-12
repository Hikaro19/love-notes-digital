import { motion } from "framer-motion";

interface PolaroidCardProps {
  image: string;
  label: string;
  rotation: number;
  delay: number;
  onClick: () => void;
}

const PolaroidCard = ({ image, label, rotation, delay, onClick }: PolaroidCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onClick={onClick}
      className="polaroid-card group relative"
      style={{ rotate: `${rotation}deg` }}
    >
      <div className="relative overflow-hidden rounded-sm aspect-square">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
          <span className="font-display text-primary-foreground text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
            {label}
          </span>
        </div>
      </div>
      <p className="font-display text-center text-foreground text-lg mt-2">{label}</p>
    </motion.div>
  );
};

export default PolaroidCard;
