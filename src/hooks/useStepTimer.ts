import { useEffect, useState } from "react";
import { ANIMATION_TIMINGS } from "@/constants/animations";

type ModalStep =
    | "initial"
    | "correct-answer"
    | "wrong-answer"
    | "photo-lia"
    | "video1"
    | "input-question"
    | "success";

// Timer delays for each step using centralized constants
const STEP_TIMERS: Record<ModalStep, number | null> = {
    initial: ANIMATION_TIMINGS.STEP_INITIAL_DELAY,
    "correct-answer": ANIMATION_TIMINGS.STEP_CONTENT_DELAY,
    "wrong-answer": ANIMATION_TIMINGS.STEP_CONTENT_DELAY,
    "photo-lia": ANIMATION_TIMINGS.STEP_CONTENT_DELAY,
    video1: ANIMATION_TIMINGS.STEP_CONTENT_DELAY,
    "input-question": null,
    success: null,
};

/**
 * Custom hook for managing step-based timers in History component
 * Automatically shows next button after a specified delay for each step
 * Uses AbortController to prevent memory leaks on unmount
 */
export const useStepTimer = (currentStep: ModalStep) => {
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        const delay = STEP_TIMERS[currentStep];

        // If no delay for this step, don't set a timer
        if (delay === null) {
            setShowNextButton(false);
            return;
        }

        const abortController = new AbortController();

        // Set timer to show button after delay
        const timer = setTimeout(() => {
            if (!abortController.signal.aborted) {
                setShowNextButton(true);
            }
        }, delay);

        // Reset button visibility when step changes
        return () => {
            abortController.abort();
            clearTimeout(timer);
            setShowNextButton(false);
        };
    }, [currentStep]);

    return showNextButton;
};
