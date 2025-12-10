interface UnicornStudioInstance {
  isInitialized: boolean;
  init: () => void;
}

declare global {
  interface Window {
    UnicornStudio: UnicornStudioInstance;
  }
}

export {};
