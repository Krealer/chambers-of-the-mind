// src/data/dialogs.ts

/**
 * DialogOption represents a choice the player can select in a dialog node.
 * - text: the option text shown to the player
 * - next: the key of the next dialog node to navigate to, or null if dialog ends
 */
export type DialogOption = {
  text: string;
  next: string | null;
};

/**
 * DialogNode represents a single "scene" or message in a dialog tree.
 * - text: the dialog text shown by the character
 * - options: the list of player response options
 */
export type DialogNode = {
  text: string;
  options: DialogOption[];
};

/**
 * DialogTree is a collection of dialog nodes keyed by string identifiers.
 * Each character has their own dialog tree.
 */
export type DialogTree = {
  [nodeKey: string]: DialogNode;
};

/**
 * dialogs object holds all dialog trees indexed by character ID.
 * Each character has a branching dialog structure.
 */
export const dialogs: Record<string, DialogTree> = {
  flamebearer: {
    start: {
      text: "Welcome to my flame-lit chamber. What do you seek?",
      options: [
        { text: "Truth.", next: "truth" },
        { text: "Comfort.", next: "comfort" },
        { text: "Leave.", next: null },
      ],
    },
    truth: {
      text: "Truth burns, but it reveals. Are you ready to face it?",
      options: [
        { text: "Yes, show me.", next: "ready" },
        { text: "Not yet.", next: "stay" },
      ],
    },
    comfort: {
      text: "Comfort is but a flicker, soon to fade. Do you want to stay?",
      options: [
        { text: "Yes, a moment longer.", next: "stay" },
        { text: "No, I must move on.", next: "moveOn" },
      ],
    },
    ready: {
      text: "Then step into the fire and awaken.",
      options: [{ text: "Step forward.", next: null }],
    },
    stay: {
      text: "The flame dims as you linger in shadows.",
      options: [{ text: "Return to start.", next: "start" }],
    },
    moveOn: {
      text: "Brave soul, walk forward into the unknown.",
      options: [{ text: "Continue.", next: null }],
    },
  },

  whisperer: {
    start: {
      text: "Can you hear the whispers? They tell many tales.",
      options: [
        { text: "Tell me more.", next: "more" },
        { text: "Silence the whispers.", next: null },
      ],
    },
    more: {
      text: "Some truths are hidden in silence, some lies loud.",
      options: [
        { text: "I will listen carefully.", next: null },
        { text: "I choose silence.", next: null },
      ],
    },
  },

  // Additional characters' dialogs go here...
};
