import {
  useCallback,
  useState,
  createContext,
  useEffect,
  useContext,
} from "react";

import { darkTheme } from "../../stitches.config";

const STORAGE_KEY =
  process.env.NEXT_PUBLIC_DARK_MODE_STORAGE_KEY || "dark-mode";

const DEFAULT_MODE = process.env.NEXT_PUBLIC_DARK_MODE_DEFAULT || "off";

export const setDarkMode = (s: boolean) => {
  if (s) {
    localStorage.setItem(STORAGE_KEY, "on");
    document.body.classList.add(darkTheme);
    return true;
  } else {
    localStorage.setItem(STORAGE_KEY, "off");
    document.body.classList.remove(darkTheme);
    return false;
  }
};

export const initDarkMode = () => {
  const existingValue = localStorage.getItem(STORAGE_KEY);
  return setDarkMode(
    (typeof existingValue !== "undefined" ? existingValue : DEFAULT_MODE) ===
      "on"
  );
};

if (typeof window !== "undefined") {
  initDarkMode();
}

type DarkModeContextValue = [boolean, () => boolean, (b: boolean) => void];

const DarkModeContext = createContext<DarkModeContextValue>(undefined);

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    return DEFAULT_MODE === "on" ? true : false;
  });

  useEffect(() => {
    setDarkModeState(initDarkMode());
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkModeState((s: boolean) => {
      return setDarkMode(!s);
    });
  }, []);

  const _setDarkModeState = useCallback((value: boolean) => {
    setDarkModeState(setDarkMode(value));
  }, []);

  const value = [
    darkMode,
    toggleDarkMode,
    _setDarkModeState,
  ] as DarkModeContextValue;

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("No DarkModeContextProvider found");
  }

  return context;
};
