import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Switch from "react-switch";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="flex justify-end">
      <div className={"max-w-med rounded-2xl px-1 py-1 flex justify-between "}>
        <Switch
          className="border"
          uncheckedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <FaSun className="w-[18px] h-[18px] text-orange-600s" />
            </div>
          }
          checkedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <FaMoon className="w-[18px] h-[18px] text-slate-100" />
            </div>
          }
          onChange={() => setIsDarkMode((dm) => !dm)}
          checked={isDarkMode}
          onColor="#3d25c2"
          offColor="#fff"
          offHandleColor="#374151"
          onHandleColor="#dde3eb"
          handleDiameter={22}
        />
      </div>
    </div>
  );
};

export default DarkModeToggle;
