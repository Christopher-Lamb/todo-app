import React, { createContext, useContext, useState, useEffect } from "react";
import { useIndexedDB } from "./IndexedDBContext";

function toggleDarkMode(input: string): string {
  // Check if the string ends with '-dark'
  if (input.endsWith("-dark")) {
    // Remove the '-dark' suffix
    return input.slice(0, -5);
  } else {
    // Add the '-dark' suffix
    return `${input}-dark`;
  }
}

interface SettingsContextType {
  isSettings: boolean;
  toggleSettings: () => void;
  changeTheme: (theme: string) => void;
  onDarkMode: (value: boolean) => void;
  setDeleteMode: (value: boolean) => void;
  onDeleteMode: (value: boolean) => void;
  darkMode: boolean;
  theme: string;
  deleteMode: boolean;
}

const defaultContextValue: Partial<SettingsContextType> = {
  // Default values or dummy functions; could also be undefined
  isSettings: undefined,
  toggleSettings: undefined,
  darkMode: false,
  deleteMode: true,
  onDarkMode: undefined,
  setDeleteMode: () => {},
  onDeleteMode: () => {},
  theme: undefined,
  changeTheme: undefined,
};
const SettingsContext = createContext(defaultContextValue);
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettings, setIsSettings] = useState(false);
  const [theme, setTheme] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(true);
  const { getTodo, updateSettings } = useIndexedDB();

  // Check for stored theme preference in local storage
  useEffect(() => {
    const initSettings = async () => {
      if (!getTodo) return;
      const { currentTheme, deleteMode, darkMode } = await getTodo("settings");
      if (darkMode !== undefined && deleteMode !== undefined && currentTheme) {
        await document.body.setAttribute("data-theme", currentTheme);
        console.log({ currentTheme, deleteMode, darkMode });
        await setDarkMode(darkMode);
        await setDeleteMode(deleteMode);
        await setTheme(currentTheme);
      }
    };
    initSettings();

    // // const storedTheme = localStorage.getItem("theme");
    // console.log("Useing and effecitng");
    // if (theme === "") {
    //   document.body.setAttribute("data-theme", "default");
    //   setTheme("default");
    // }
  }, []);

  // const toggleDarkMode = () => {
  //   console.log(theme);
  //   setDarkMode();
  // };

  const changeTheme = (theme: string) => {
    let newTheme = theme;
    if (darkMode) {
      newTheme = theme + "-dark";
      console.log({ newTheme });
      setTheme(newTheme);
    } else {
      setTheme(theme);
    }
    if (updateSettings) updateSettings({ key: "currentTheme", value: newTheme });
    document.body.setAttribute("data-theme", newTheme);
  };

  const onDarkMode = (value: boolean) => {
    setDarkMode(value);
    const newTheme = toggleDarkMode(theme);
    setTheme(newTheme);
    if (updateSettings) {
      updateSettings({ key: "currentTheme", value: newTheme });
      updateSettings({ key: "darkMode", value: value });
    }
    document.body.setAttribute("data-theme", newTheme);
  };

  const onDeleteMode = (value: boolean) => {
    setDeleteMode(value);
    if (updateSettings) {
      updateSettings({ key: "deleteMode", value: value });
    }
  };

  const toggleSettings = () => {
    setIsSettings((prev) => !prev);
  };

  return <SettingsContext.Provider value={{ onDeleteMode, isSettings, darkMode, deleteMode, changeTheme, setDeleteMode, onDarkMode, toggleSettings, theme }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
