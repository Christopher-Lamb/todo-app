import React from "react";
import SettingsOverlay from "./SettingsOverlay";
import { useSettings } from "../../context/SettingsContext";
import DarkModeToggle from "../Toggles/DarkModeToggle";
import DeleteToggle from "../Toggles/DeleteToggle";
import CleanModeToggle from "../Toggles/CleanModeToggle";
import { IoIosClose } from "react-icons/io";

const SettingsComp: React.FC = () => {
  const { toggleSettings } = useSettings();
  return (
    <SettingsOverlay>
      <div className="bg-gray-50 shadow w-10d mx-auto max-w-three h-three mt-one p-8 todo-item-style">
        <div className="relative">
          <button onClick={toggleSettings} className="absolute right-0">
            <IoIosClose size={"2rem"} />
          </button>
        </div>
        <div>
          <label>Dark Mode</label>
          <DarkModeToggle />
        </div>
        <div className='mt-2'>
          <label>Delete Mode</label>
          <DeleteToggle />
        </div>
        {/* <CleanModeToggle /> */}
        <div className="grid mt-4">
          <label htmlFor="theme selector">Themes</label>
          <ThemesComponent />
        </div>
        {/* <div>Header Font</div>
        <FontsComponent /> */}
      </div>
    </SettingsOverlay>
  );
};

const ThemesComponent: React.FC = () => {
  const { changeTheme = () => {}, theme = "" } = useSettings();

  let currentTheme = theme;
  if (currentTheme.endsWith("-dark")) {
    // Remove the '-dark' suffix
    currentTheme = currentTheme.slice(0, -5);
    console.log({ currentTheme });
  }
  return (
    <select className="p-2 sort-style" name="theme-selector" aria-label="Select Theme" onChange={(e) => changeTheme(e.target.value)} value={currentTheme} defaultValue="default">
      <option value="default">Default</option>
      <option value="cherry-blossom">Cherry Blossom</option>
      <option value="ocean">Ocean</option>
      <option value="forest">Forest</option>
      <option value="black-and-white">Black and White</option>
    </select>
  );
};

const FontsComponent: React.FC = () => {
  return (
    <select>
      <option>Archivo</option>
      <option>Jost</option>
      <option>Sans-serif</option>
      <option>Mono</option>
      <option>Minecraft</option>
    </select>
  );
};

export default SettingsComp;
