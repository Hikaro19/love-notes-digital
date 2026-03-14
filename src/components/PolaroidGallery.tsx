import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PolaroidCard from "./PolaroidCard";
import ModalPhoto from "./ModalPhoto";
import BackButton from "./BackButton";
import { PHOTOS_DATA } from "@/data/photos";
import { ANIMATION_TIMINGS } from "@/constants/animations";

import bgGallery from "@/assets/photos/bg-galery.jpg";

const PolaroidGallery = ({ onBack }: { onBack: () => void }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewedPhotos, setViewedPhotos] = useState(new Set());
  const [showFinal, setShowFinal] = useState(false);

  const allViewed = useMemo(() => viewedPhotos.size === PHOTOS_DATA.length, [viewedPhotos]);

  const handlePhotoClick = (index) => {
    setSelectedPhoto(PHOTOS_DATA[index]);
    setViewedPhotos((prev) => new Set([...prev, index]));
  };

  return (
    <div className="relative min-h-screen overflow-y-auto">
      <BackButton onClick={onBack} ariaLabel="Voltar para tela anterior" />
      {/* Background */}
      <div
        className="bg-screen-base"
        style={{ backgroundImage: `url(${bgGallery})` }}
        role="img"
        aria-label="Fundo da galeria de fotos"
      />
      <div className="gallery-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-8 sm:py-12 min-h-screen">
        {/* Header text */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-primary-foreground text-center text-sm sm:text-base leading-relaxed max-w-md mb-8 sm:mb-12 px-6"
          aria-live="polite"
        >
          "Quando você me pergunta o porquê de eu estar te olhando e eu não sei
          o que responder, ou digo apenas um 'nada não', são algumas dessas
          opções que passam na minha cabeça…"
        </motion.p>

        {/* Instruction text */}
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-primary-foreground/90 text-center text-sm sm:text-base leading-relaxed max-w-md mb-12 sm:mb-16 px-2"
        >
          Role e clique em cada polaroid para descobrir mais sobre os detalhes que eu admiro em você ✨
        </motion.p>

        {/* Polaroid grid - zig-zag */}
        <div 
          className="relative w-full max-w-md mx-auto" 
          style={{ aspectRatio: "9/17" }}
          role="region"
          aria-label="Galeria de fotos em formato Polaroid"
        >
          {PHOTOS_DATA.map((photo, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: i % 2 === 0 ? "-3%" : "58%",
                top: `${Math.floor(i / 2) * 68}%`,
                width: "45%",
              }}
            >
              <PolaroidCard
                image={photo.image}
                label={photo.label}
                rotation={photo.rotation}
                delay={i * ANIMATION_TIMINGS.PHOTO_STAGGER_DELAY}
                onClick={() => handlePhotoClick(i)}
              />
            </div>
          ))}
        </div>

        {/* Final button */}
        <AnimatePresence>
          {allViewed && !showFinal && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setShowFinal(true)}
              className="btn-romantic mt-8 relative z-20"
              aria-label="Ver a mensagem final"
            >
              Tem mais uma coisa...
            </motion.button>
          )}
        </AnimatePresence>

        {/* Final message */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 text-center max-w-sm mt-8 shadow-2xl relative z-20"
            >
              <p className="font-body text-foreground text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {"No fim das contas,\no motivo de eu te olhar tanto\né simples…\n\n"}
              </p>
              <p className="font-display text-primary text-3xl sm:text-4xl mt-4 glow-text">
                eu amo você e cada detalhe seu.
              </p>
              <span className="text-4xl mt-4 block heartbeat-icon">🤍</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <ModalPhoto
          isOpen={!!selectedPhoto}
          image={selectedPhoto.image}
          label={selectedPhoto.label}
          description={selectedPhoto.description}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default PolaroidGallery;
