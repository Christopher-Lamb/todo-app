import React, { useState } from "react";
import DarkModeToggle from "./Toggles/DarkModeToggle";
import DeleteToggle from "./Toggles/DeleteToggle";
import { FaRedo, FaUndo, FaSearch } from "react-icons/fa";

interface PageHeaderControlsProps {
  title: string;
}

const PageHeaderControls: React.FC<PageHeaderControlsProps> = ({ title = "title" }) => {
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col justify-between">
        <a href="/">Back</a>
        <h1 className="text-large archivo">{title}</h1>
      </div>
      <div className="grid grid-row-3 col-span-2">
        <div className="flex justify-end">
          <DeleteToggle />
          <DarkModeToggle />
        </div>
        <UndoRedo />
        <div className="flex">
          <SearchBar />
          <FilterBox />
        </div>
      </div>
    </div>
  );
};

const Wrapper: React.FC<{ children: React.ReactNode; width?: string }> = ({ children, width = "100%" }) => {
  return (
    <div className="h-small " style={{ width }}>
      {children}
    </div>
  );
};

const SearchBar: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex items-center justify-end">
        <div className="flex gap-2 items-center px-2 py-1 mr-2xsmall h-small bg-white">
          <FaSearch className="" />
          <input className="h-small px-2" />
        </div>
      </div>
    </Wrapper>
  );
};

const FilterBox: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Wrapper width="50%">
      <div className="flex items-center justify-end h-small">
        <select value={selectedValue} onChange={handleChange} className="h-small px-2">
          <option value="">Filter</option>
          <option value="last-updated">Last Updated</option>
          <option value="last-created">Last Created</option>
          <option value="aToZ">A - Z</option>
        </select>
      </div>
    </Wrapper>
  );
};

const UndoRedo: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex justify-end h-small items-center  gap-3xsmall mr-3xsmall">
        <button title="undo" onClick={() => {}}>
          <FaUndo />
        </button>
        <button title="redo" onClick={() => {}}>
          <FaRedo />
        </button>
      </div>
    </Wrapper>
  );
};

export default PageHeaderControls;
export { Wrapper };
