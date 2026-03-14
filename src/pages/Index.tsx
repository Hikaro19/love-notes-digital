import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ANIMATION_TIMINGS } from "@/constants/animations";
import StartScreen from "@/components/StartScreen";
import History from "@/components/History";
import MessageScreen from "@/components/MessageScreen";
import PolaroidGallery from "@/components/PolaroidGallery";

type Screen = "start" | "history" | "message" | "gallery";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("start");

  const handleBackClick = (currentScreen: Screen) => {
    const navigationMap: Record<Screen, Screen | null> = {
      start: null,
      history: "start",
      message: "history",
      gallery: "message",
    };
    const previousScreen = navigationMap[currentScreen];
    if (previousScreen) {
      setScreen(previousScreen);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ANIMATION_TIMINGS.SCREEN_FADE_DURATION }}
        className="min-h-screen"
      >
        {screen === "start" && <StartScreen onEnter={() => setScreen("history")} />}
        {screen === "history" && <History onNext={() => setScreen("message")} onBack={() => handleBackClick("history")} />}
        {screen === "message" && <MessageScreen onNext={() => setScreen("gallery")} onBack={() => handleBackClick("message")} />}
        {screen === "gallery" && <PolaroidGallery onBack={() => handleBackClick("gallery")} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
