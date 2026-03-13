import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StartScreen from "@/components/StartScreen";
import History from "@/components/History";
import MessageScreen from "@/components/MessageScreen";
import PolaroidGallery from "@/components/PolaroidGallery";

type Screen = "start" | "history" | "message" | "gallery";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("start");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {screen === "start" && <StartScreen onEnter={() => setScreen("history")} />}
        {screen === "history" && <History onNext={() => setScreen("message")} />}
        {screen === "message" && <MessageScreen onNext={() => setScreen("gallery")} />}
        {screen === "gallery" && <PolaroidGallery />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
