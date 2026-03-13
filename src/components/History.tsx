import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import videoCaseiNaLiberta from "@/assets/photos/videoCaseiNaLiberta.mp4";
import videoNamoramos from "@/assets/photos/videoNamoramos.mp4";
import fotoComLia from "@/assets/photos/fotoComLia.jpg";
import fotoCredo from "@/assets/photos/fotoCredo.jpg";
import fotoDormindo from "@/assets/photos/fotoDormindo.jpg";
import video1 from "@/assets/photos/video1.mp4";

interface HistoryProps {
  onNext: () => void;
}

type ModalStep =
  | "initial"
  | "correct-answer"
  | "wrong-answer"
  | "photo-lia"
  | "video1"
  | "input-question"
  | "success";

const History = ({ onNext }: HistoryProps) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>("initial");
  const [showNextButton, setShowNextButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [shaking, setShaking] = useState(false);

  const correctAnswers = ["apagar", "dormir"];

  const validateInput = () => {
    const normalized = inputValue.trim().toLowerCase();
    if (correctAnswers.includes(normalized)) {
      setInputError(false);
      setInputErrorMessage("");
      setTimeout(() => setCurrentStep("success"), 300);
      return true;
    } else {
      setInputError(true);
      setInputErrorMessage("Nãaao, isso não");
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      return false;
    }
  };

  // Initial modal - show next button after 2 seconds
  useEffect(() => {
    if (currentStep === "initial") {
      const timer = setTimeout(() => setShowNextButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Correct answer modal - show next button after 5 seconds
  useEffect(() => {
    if (currentStep === "correct-answer") {
      const timer = setTimeout(() => setShowNextButton(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Wrong answer modal - show next button after 5 seconds
  useEffect(() => {
    if (currentStep === "wrong-answer") {
      const timer = setTimeout(() => setShowNextButton(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Photo Lia modal - show next button after 5 seconds
  useEffect(() => {
    if (currentStep === "photo-lia") {
      const timer = setTimeout(() => setShowNextButton(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Video 1 modal - show next button after 5 seconds
  useEffect(() => {
    if (currentStep === "video1") {
      const timer = setTimeout(() => setShowNextButton(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleCorrectAnswer = () => {
    setCurrentStep("correct-answer");
    setShowNextButton(false);
  };

  const handleWrongAnswer = () => {
    setCurrentStep("wrong-answer");
    setShowNextButton(false);
  };

  const handleNextFromAnswers = () => {
    setCurrentStep("photo-lia");
    setShowNextButton(false);
  };

  const handleNextFromLia = () => {
    setCurrentStep("video1");
    setShowNextButton(false);
  };

  const handleNextFromVideo1 = () => {
    setCurrentStep("input-question");
    setShowNextButton(false);
  };

  const handleSuccessClick = () => {
    onNext();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-romantic">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 min-h-screen">
        <AnimatePresence mode="wait">
          {/* STEP 1: Initial Question */}
          {currentStep === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-20 flex items-center justify-center px-4"
            >
              <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-2xl max-w-md w-full backdrop-blur-sm">
                <p className="text-foreground font-body text-base sm:text-lg text-center mb-8 leading-relaxed">
                  E pensar que tudo começou com uma brincadeira, mas, sabe onde
                  caiu a ficha que poderia rolar algo entre nós dois?
                </p>

                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={handleCorrectAnswer}
                    className="btn-romantic w-full"
                    whileTap={{ scale: 0.95 }}
                  >
                    Final da Libertaaa❤️
                  </motion.button>
                  <motion.button
                    onClick={handleWrongAnswer}
                    className="btn-romantic-outline w-full"
                    whileTap={{ scale: 0.95 }}
                  >
                    No RockPoint ☠️
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Correct Answer - Videos */}
          {currentStep === "correct-answer" && (
            <motion.div
              key="correct-answer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-20 flex items-center justify-center px-4"
            >
              <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-2xl max-w-2xl w-full backdrop-blur-sm max-h-screen overflow-y-auto">
                <p className="text-foreground font-body text-base sm:text-lg text-center mb-6 leading-relaxed">
                  Isso aeeee. No mesmo dia já emocionei KSKSKSKSK
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="w-full">
                    <video
                      controls
                      className="w-full h-auto rounded-lg bg-black"
                      src={videoCaseiNaLiberta}
                    />
                  </div>
                  <div className="w-full">
                    <video
                      controls
                      className="w-full h-auto rounded-lg bg-black"
                      src={videoNamoramos}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {showNextButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-center"
                    >
                      <motion.button
                        onClick={handleNextFromAnswers}
                        className="btn-romantic"
                        whileTap={{ scale: 0.95 }}
                      >
                        Próximo
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Wrong Answer - Photo */}
          {currentStep === "wrong-answer" && (
            <motion.div
              key="wrong-answer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-20 flex items-center justify-center px-4"
            >
              <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-2xl max-w-md w-full backdrop-blur-sm">
                <p className="text-foreground font-body text-base sm:text-lg text-center mb-6 leading-relaxed">
                  Credo, RockPoint é osso em KKSKSKSK
                </p>

                <div className="w-full mb-6">
                  <img
                    src={fotoCredo}
                    alt="Rock Point"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <AnimatePresence>
                  {showNextButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-center"
                    >
                      <motion.button
                        onClick={handleNextFromAnswers}
                        className="btn-romantic"
                        whileTap={{ scale: 0.95 }}
                      >
                        Próximo
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Photo with Lia */}
          {currentStep === "photo-lia" && (
            <motion.div
              key="photo-lia"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-20 flex items-center justify-center px-4"
            >
              <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-2xl max-w-md w-full backdrop-blur-sm">
                <p className="text-foreground font-body text-base sm:text-lg text-center mb-6 leading-relaxed">
                  Pior que eu enrolei tanto para te beijar que até Lia achou que
                  ficaria na amizade…
                </p>

                <div className="w-full mb-6">
                  <img
                    src={fotoComLia}
                    alt="Com Lia"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <AnimatePresence>
                  {showNextButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-center"
                    >
                      <motion.button
                        onClick={handleNextFromLia}
                        className="btn-romantic"
                        whileTap={{ scale: 0.95 }}
                      >
                        Próximo
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Video 1 */}
          {currentStep === "video1" && (
            <motion.div
              key="video1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-20 flex items-center justify-center px-4"
            >
              <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-2xl max-w-md w-full backdrop-blur-sm">
                <p className="text-foreground font-body text-base sm:text-lg text-center mb-6 leading-relaxed">
                  Felizmente deu tudo certo! E depois do primeiro beijo eu já
                  estava assim:
                </p>

                <div className="w-full mb-6">
                  <video
                    controls
                    className="w-full h-auto rounded-lg bg-black"
                    src={video1}
                  />
                </div>

                <AnimatePresence>
                  {showNextButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-center"
                    >
                      <motion.button
                        onClick={handleNextFromVideo1}
                        className="btn-romantic"
                        whileTap={{ scale: 0.95 }}
                      >
                        Próximo
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Input Question */}
          {currentStep === "input-question" && (
            <motion.div
              key="input-question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-20 flex items-center justify-center px-4"
            >
              <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-2xl max-w-md w-full backdrop-blur-sm">
                <p className="text-foreground font-body text-base sm:text-lg text-center mb-8 leading-relaxed">
                  Agora, dúvido acertar uma das programações que eu mais gosto
                  de fazer com você desde que nos conhecemos. Dica: Você AMA, e geralmente é nos finais de semana.
                </p>

                <div className="mb-6">
                  <motion.input
                    animate={shaking ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    type="text"
                    placeholder="Digite aqui..."
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setInputError(false);
                      setInputErrorMessage("");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        validateInput();
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      inputError
                        ? "border-red-500 bg-red-50"
                        : "border-input bg-background"
                    } text-foreground focus:outline-none focus:ring-2 focus:ring-romantic`}
                  />
                  {inputErrorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {inputErrorMessage}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  onClick={() => validateInput()}
                  className="btn-romantic w-full"
                  whileTap={{ scale: 0.95 }}
                >
                  Verificar
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Success Card */}
          {currentStep === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-20 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-md max-h-screen overflow-y-auto">
                {/* Success Alert/Toast */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4"
                >
                  <p className="text-green-700 font-body text-center">
                    Acertou! 🎉
                  </p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg w-full text-center"
                >
                  <div className="w-4/5 mx-auto mb-6">
                    <img
                      src={fotoDormindo}
                      alt="Dormindo"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <p className="text-foreground font-body text-base sm:text-lg mb-6">
                    Enfim… vamos ao que interessa.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                      onClick={handleSuccessClick}
                      className="btn-romantic"
                      whileTap={{ scale: 0.95 }}
                    >
                      Vamos
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default History;
