import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalPhotoProps {
  isOpen: boolean;
  image: string;
  label: string;
  description: string;
  onClose: () => void;
}

const ModalPhoto = ({ isOpen, image, label, description, onClose }: ModalPhotoProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={image} alt={label} className="w-full aspect-square object-cover" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-card transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-display text-3xl text-foreground mb-3">{label}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPhoto;
