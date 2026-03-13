import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANIMATION_TIMINGS } from "@/constants/animations";
import bgMessage from "@/assets/photos/bg-message.jpg";

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

  // Typing effect with AbortController to prevent memory leaks
  useEffect(() => {
    const abortController = new AbortController();
    let i = 0;

    const interval = setInterval(() => {
      if (abortController.signal.aborted) {
        clearInterval(interval);
        return;
      }

      if (i < fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        if (!abortController.signal.aborted) {
          setTypingDone(true);
        }
      }
    }, ANIMATION_TIMINGS.TYPING_SPEED);

    return () => {
      abortController.abort();
      clearInterval(interval);
    };
  }, [fullMessage.length]);

  // Show card after typing completes
  useEffect(() => {
    if (!typingDone) return;

    const abortController = new AbortController();

    const timer = setTimeout(() => {
      if (!abortController.signal.aborted) {
        setShowCard(true);
      }
    }, ANIMATION_TIMINGS.MESSAGE_SHOW_CARD_DELAY);

    return () => {
      abortController.abort();
      clearTimeout(timer);
    };
  }, [typingDone]);

  const handleRefuse = useCallback(() => {
    setShowSideMessage(true);
    
    const abortController = new AbortController();
    const timer = setTimeout(() => {
      if (!abortController.signal.aborted) {
        setShowSideMessage(false);
      }
    }, ANIMATION_TIMINGS.SIDE_MESSAGE_DISMISS_DELAY);

    return () => {
      abortController.abort();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-y-auto">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgMessage})` }}
      />
      <div className="gallery-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 min-h-screen gap-8">
        <div className="flex flex-col items-center gap-8 max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg w-full ${
            !typingDone ? "breathing-card" : ""
          }`}
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
              transition={{ duration: ANIMATION_TIMINGS.MODAL_TRANSITION }}
              className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg w-full text-center"
            >
              <p className="text-foreground font-body text-base sm:text-lg mb-6">
                Quero ressaltar alguns detalhes que admiro em você. Posso?
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
    </div>
  );
};

export default MessageScreen;
