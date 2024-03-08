import "./src/styles/global.css";
import "./src/context/SettingsContext.css";
import React from "react";
import { IndexedDBProvider } from "./src/context/IndexedDBContext.tsx";
import { SettingsProvider } from "./src/context/SettingsContext.tsx";

export const wrapRootElement = ({ element }) => {
  return (
    <IndexedDBProvider>
      <SettingsProvider>
        {/* <div id="portal-root"></div> */}
        {element}
      </SettingsProvider>
    </IndexedDBProvider>
  );
};
