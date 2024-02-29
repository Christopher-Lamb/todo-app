import "./src/styles/global.css";
import React from "react";
import { IndexedDBProvider } from "./src/context/IndexedDBContext.tsx";

export const wrapRootElement = ({ element }) => {
  return <IndexedDBProvider>{element}</IndexedDBProvider>;
};
