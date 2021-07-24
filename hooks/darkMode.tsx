import {
  useCallback,
  useState,
  createContext,
  useEffect,
  useContext,
} from "react";

import { darkTheme } from "../stitches.config";

const STORAGE_KEY =
  process.env.NEXT_PUBLIC_DARK_MODE_STORAGE_KEY || "dark-mode";

if (typeof window !== "undefined") {
  if (window.localStorage.getItem(STORAGE_KEY) === "on") {
    window.document.body.classList.add(darkTheme);
  } else {
    window.document.body.classList.remove(darkTheme);
  }
}

type DarkModeContextValue = [boolean, () => boolean, (b: boolean) => void];

const DarkModeContext = createContext<DarkModeContextValue>([
  false,
  () => false,
  () => {},
]);

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    return false;
  });

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "on") {
      document.body.classList.add(darkTheme);
      setDarkModeState(true);
    } else {
      document.body.classList.remove(darkTheme);
      setDarkModeState(false);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkModeState((s: boolean) => {
      if (s) {
        localStorage.setItem(STORAGE_KEY, "off");
        document.body.classList.remove(darkTheme);
        return false;
      } else {
        localStorage.setItem(STORAGE_KEY, "on");
        document.body.classList.add(darkTheme);
        return true;
      }
    });
  }, []);

  const setDarkMode = useCallback((value: boolean) => {
    if (!value) {
      localStorage.setItem(STORAGE_KEY, "off");
      document.body.classList.remove(darkTheme);
      setDarkModeState(false);
    } else {
      localStorage.setItem(STORAGE_KEY, "on");
      document.body.classList.add(darkTheme);
      setDarkModeState(true);
    }
  }, []);

  const value = [darkMode, toggleDarkMode, setDarkMode] as DarkModeContextValue;

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
