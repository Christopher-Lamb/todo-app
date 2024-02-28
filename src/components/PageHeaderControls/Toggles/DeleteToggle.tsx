import React, { useState } from "react";
import { Wrapper } from "../PageHeaderControls";
import { MdDelete } from "react-icons/md";
import Switch from "react-switch";

const DeleteToggle: React.FC = () => {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <Wrapper width="15%">
      <div className="flex justify-end">
        <div className={"max-w-med rounded-2xl px-1 py-1 flex justify-between "}>
          <Switch
            className="border"
            uncheckedIcon={
              <div className="flex items-center justify-center w-full h-full">
                <MdDelete className="w-[18px] h-[18px] text-orange-600s" />
              </div>
            }
            checkedIcon={
              <div className="flex items-center justify-center w-full h-full">
                <MdDelete className="w-[18px] h-[18px] text-slate-100" />
              </div>
            }
            onChange={() => setIsDelete((dt) => !dt)}
            checked={isDelete}
            onColor="#dc3e3e"
            offColor="#fff"
            offHandleColor="#374151"
            onHandleColor="#dde3eb"
            handleDiameter={22}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default DeleteToggle;
