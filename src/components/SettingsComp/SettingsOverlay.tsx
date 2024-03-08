import React from "react";
import ReactDOM from "react-dom";

const SettingsOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use a ref to ensure the same div is used for the portal container
  const elRef = React.useRef(document.createElement("div"));

  React.useEffect(() => {
    const portalRoot = document.getElementById("portal-root");
    if (!portalRoot) return;
    portalRoot.appendChild(elRef.current);

    // Cleanup function to remove the appended child
    return () => {
      portalRoot.removeChild(elRef.current);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="overlay top-0 " style={{ position: "fixed", width: "100vw", height: "100vh" }}>
      {children}
    </div>,
    elRef.current
  );
};

export default SettingsOverlay;
