/**
 * Animation timing constants
 * Centralize all timing values for consistency and maintainability
 */

export const ANIMATION_TIMINGS = {
    // Typing effect - optimized for engagement (was 45ms)
    TYPING_SPEED: 28,

    // Card animations
    CARD_APPEAR_DELAY: 0.3,
    CARD_APPEAR_DURATION: 0.6,

    // Motion transitions
    MODAL_TRANSITION: 0.5,
    HEART_FLOAT_DURATION: 2.5,
    HEART_FLOAT_AMPLITUDE: 8,

    // Screen transitions
    SCREEN_FADE_DURATION: 0.5,

    // Message screen delays - reduced for better pacing
    MESSAGE_SHOW_CARD_DELAY: 800,
    SIDE_MESSAGE_DISMISS_DELAY: 4000,

    // Input validation
    SHAKE_ANIMATION_DURATION: 600,
    INPUT_SUCCESS_TRANSITION: 300,

    // Celebration animations
    HEARTBEAT_DURATION: 1.2,
    PHOTO_STAGGER_DELAY: 0.15,
    BREATHING_DURATION: 3,
    GLOW_PULSE_DURATION: 2,

    // Step screen delays
    STEP_INITIAL_DELAY: 2000,
    STEP_CONTENT_DELAY: 5000,
} as const;

// Export as object with type safety
export type TimingKey = keyof typeof ANIMATION_TIMINGS;
