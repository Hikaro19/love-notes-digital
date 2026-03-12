import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PolaroidCard from "./PolaroidCard";
import ModalPhoto from "./ModalPhoto";

import photo1 from "@/assets/photos/FotoSorriso.jpg";
import photo2 from "@/assets/photos/FotoOlhar.png";
import photo3 from "@/assets/photos/FotoJeito.jpg";
import photo4 from "@/assets/photos/FotoJeito.jpg";
import bgGallery from "@/assets/photos/bg-galery.jpg";

interface PhotoData {
  image: string;
  label: string;
  description: string;
  rotation: number;
}

const photos: PhotoData[] = [
  {
    image: photo1,
    label: "Seu sorriso",
    description:
      "Seu sorriso me contagia. Quando você sorri, o mundo inteiro parece ficar mais bonito. É impossível não sorrir junto.",
    rotation: -3,
  },
  {
    image: photo2,
    label: "Seu olhar",
    description:
      "Esse olhar que diz tanta coisa sem precisar de palavras. É nele que eu me perco e me encontro ao mesmo tempo.",
    rotation: 2,
  },
  {
    image: photo3,
    label: "Seu jeito",
    description:
      "Seu jeitinho único de ser, de lutar, de cuidar, de amar. Tudo em você é especial de um jeito que só você consegue ser.",
    rotation: -1,
  },
  {
    image: photo4,
    label: "Seu carinho ",
    description:
      "Seu jeitinho único de ser, de cuidar, de amar. Tudo em você é especial de um jeito que só você consegue ser.",
    rotation: 2,
  },
];

const PolaroidGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [viewedPhotos, setViewedPhotos] = useState<Set<number>>(new Set());
  const [showFinal, setShowFinal] = useState(false);

  const allViewed = useMemo(() => viewedPhotos.size === photos.length, [viewedPhotos]);

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(photos[index]);
    setViewedPhotos((prev) => new Set([...prev, index]));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgGallery})` }}
      />
      <div className="gallery-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-8 sm:py-12 min-h-screen">
        {/* Header text */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-primary-foreground text-center text-sm sm:text-base leading-relaxed max-w-md mb-8 sm:mb-12 px-2"
        >
          "Quando você me pergunta o porquê de eu estar te olhando e eu não sei
          o que responder, ou digo apenas um 'nada não', são algumas dessas
          opções que passam na minha cabeça…"
        </motion.p>

        {/* Polaroid grid - zig-zag */}
        <div className="relative w-full max-w-md mx-auto ml-auto" style={{ aspectRatio: "9/15" }}>
          {photos.map((photo, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: i % 2 === 0 ? "-5%" : "61%",
                top: `${Math.floor(i / 2) * 70}%`,
                width: "45%",
              }}
            >
              <PolaroidCard
                image={photo.image}
                label={photo.label}
                rotation={photo.rotation}
                delay={i * 0.3}
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
              <p className="font-display text-primary text-3xl sm:text-4xl mt-4">
                eu gosto muito de você.
              </p>
              <span className="text-2xl mt-4 block">🤍</span>
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
