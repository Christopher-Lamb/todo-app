import React, { useState } from "react";
// import { FaSun, FaMoon } from "react-icons/fa";
import Switch from "react-switch";
import { FaSoap } from "react-icons/fa6";


const CleanModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const [isCleanMode, setIsCleanMode] = useState(false);
  return (
    <div className={className} title="Clean UI Mode">
      <div className={"max-w-med rounded-2xl px-1 py-1 flex justify-between "}>
        <Switch
          className="border"
          uncheckedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <FaSoap className="w-[18px] h-[18px] text-orange-600s" />
            </div>
          }
          checkedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <FaSoap className="w-[18px] h-[18px] text-slate-100" />
            </div>
          }
          onChange={() => setIsCleanMode((dm) => !dm)}
          checked={isCleanMode}
          onColor="#5ab9eb"
          offColor="#fff"
          activeBoxShadow="0 0 2px 3px #167EB6"
          offHandleColor="#374151"
          onHandleColor="#dde3eb"
          handleDiameter={22}
        />
      </div>
    </div>
  );
};

export default CleanModeToggle;
