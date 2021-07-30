import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  DarkModeContextProvider,
  useDarkMode,
  setDarkMode,
  initDarkMode,
} from "./darkMode";

const TestDarkMode = () => {
  const [darkMode, toggleDarkMode, setDarkMode] = useDarkMode();

  return (
    <>
      <input data-testid="value" type="checkbox" disabled checked={darkMode} />
      <button data-testid="toggle" onClick={toggleDarkMode}>
        Toggle dark mode
      </button>
      <button
        data-testid="set"
        onClick={(e) => {
          setDarkMode(!darkMode);
        }}
      >
        Set dark mode {!darkMode}
      </button>
    </>
  );
};

describe("Dark mode", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("setDarkMode sets the localstorage item and body classname", () => {
    expect(localStorage.getItem("dark-mode")).toBe("off");

    setDarkMode(true);

    expect(localStorage.getItem("dark-mode")).toBe("on");

    expect(document.body).toHaveClass("dark-mode");

    setDarkMode(false);

    expect(localStorage.getItem("dark-mode")).toBe("off");

    expect(document.body).not.toHaveClass("dark-mode");
  });

  test("initDarkMode sets default value", () => {
    expect(localStorage.getItem("dark-mode")).toBe(null);

    initDarkMode();

    expect(localStorage.getItem("dark-mode")).toBe("off");
  });

  test("DarkModeContextProvider sets default value", () => {
    render(
      <DarkModeContextProvider>
        <TestDarkMode />
      </DarkModeContextProvider>
    );

    expect(localStorage.getItem("dark-mode")).toBe("off");
  });

  test("useDarkMode toggles dark mode state", () => {
    render(
      <DarkModeContextProvider>
        <TestDarkMode />
      </DarkModeContextProvider>
    );

    userEvent.click(screen.getByTestId("toggle"));

    expect(screen.getByTestId("value")).toBeChecked();
    expect(localStorage.getItem("dark-mode")).toBe("on");

    userEvent.click(screen.getByTestId("toggle"));
    expect(localStorage.getItem("dark-mode")).toBe("off");

    expect(screen.getByTestId("value")).not.toBeChecked();
  });

  test("useDarkMode sets dark mode state", () => {
    render(
      <DarkModeContextProvider>
        <TestDarkMode />
      </DarkModeContextProvider>
    );

    userEvent.click(screen.getByTestId("set"));

    expect(screen.getByTestId("value")).toBeChecked();
    expect(localStorage.getItem("dark-mode")).toBe("on");

    userEvent.click(screen.getByTestId("set"));

    expect(screen.getByTestId("value")).not.toBeChecked();
    expect(localStorage.getItem("dark-mode")).toBe("off");
  });
});
