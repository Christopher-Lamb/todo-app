import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Switch from "react-switch";
import { useSettings } from "../../context/SettingsContext";

const DeleteToggle: React.FC<{ className?: string }> = ({ className }) => {
  const [isDelete, setIsDelete] = useState(false);
  const { deleteMode = true, onDeleteMode } = useSettings();

  const handleSwitch = (value: boolean) => {
    if (!onDeleteMode) return;
    onDeleteMode(value);
  };

  return (
    <div className={className} title="Delete Mode">
      <div className={"max-w-med rounded-2xl px-1 py-1 flex justify-between "}>
        <Switch
          className="border"
          uncheckedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <MdDelete className="w-[18px] h-[18px] text-slate-600" />
            </div>
          }
          checkedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <MdDelete className="w-[18px] h-[18px] text-slate-100" />
            </div>
          }
          onChange={handleSwitch}
          checked={deleteMode}
          onColor="#dc3e3e"
          offColor="#fff"
          activeBoxShadow="0 0 2px 3px #F4C2C2"
          offHandleColor="#374151"
          onHandleColor="#dde3eb"
          handleDiameter={22}
        />
      </div>
    </div>
  );
};

export default DeleteToggle;
