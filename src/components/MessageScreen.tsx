import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageScreenProps {
  onNext: () => void;
}

const fullMessage = `Feliz aniversário, linda! 🤍
Espero que você aproveite seu dia!

Desejo o melhor para sua vida,
e que eu possa estar junto de ti,
cuidando de você,
torcendo e ajudando no que eu puder.

Que papai do céu lhe abençoe!`;

const MessageScreen = ({ onNext }: MessageScreenProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showSideMessage, setShowSideMessage] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typingDone) {
      const timer = setTimeout(() => setShowCard(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [typingDone]);

  const handleRefuse = useCallback(() => {
    setShowSideMessage(true);
    setTimeout(() => setShowSideMessage(false), 4000);
  }, []);

  return (
    <div className="romantic-gradient-bg flex items-center justify-center px-4">
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg w-full"
        >
          <p className="text-foreground font-body text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {displayedText}
            {!typingDone && <span className="typing-cursor" />}
          </p>
        </motion.div>

        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg w-full text-center"
            >
              <p className="text-foreground font-body text-base sm:text-lg mb-6">
                Quero ressaltar alguns detalhes que fico admirado em você.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={onNext}
                  className="btn-romantic"
                  whileTap={{ scale: 0.95 }}
                >
                  Claro
                </motion.button>
                <motion.button
                  onClick={handleRefuse}
                  className="btn-romantic-outline"
                  whileTap={{ scale: 0.95 }}
                >
                  Hmm, prefiro não ver
                </motion.button>
              </div>

              <AnimatePresence>
                {showSideMessage && (
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-primary font-body text-sm mt-4 italic"
                  >
                    Ah, fica assim então. Aperta em "Claro" logo por favor! 😅
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageScreen;
