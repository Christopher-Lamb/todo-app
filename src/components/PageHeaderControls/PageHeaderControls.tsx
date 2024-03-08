import React, { useEffect, useState } from "react";
import DarkModeToggle from "../Toggles/DarkModeToggle";
import DeleteToggle from "../Toggles/DeleteToggle";
import { FaRedo, FaUndo } from "react-icons/fa";
import { useIndexedDB } from "../../context/IndexedDBContext";
import { sortTodosAZ, sortTodosZA, sortTodosByLastCreated, sortTodosByLastUpdated, sortTodosByOldestCreated, sortTodosByOldestUpdated } from "./sortFunctions";
import { IoMdSettings } from "react-icons/io";
import { useSettings } from "../../context/SettingsContext";
import { SettingsComp } from "..";
import { TiArrowBack } from "react-icons/ti";
import "./PageHeaderControls.css";

interface PageHeaderControlsProps {
  title: string;
  parentId: string;
  onSort: (ids: string[]) => void;
  back?: boolean;
}

interface TodoItem {
  id: string;
  content: string;
  date_created: number;
  date_updated: number;
  todoIds?: string[];
}

// TODO: Dark Mode and Delete Mode switches will be controlled in SettingsContext so we will import a useSettingContext at some point
// accepts a list of object return a filtered list

const PageHeaderControls: React.FC<PageHeaderControlsProps> = ({ title = "title", parentId, onSort, back = false }) => {
  const [childTodos, setChildTodos] = useState<TodoItem[] | undefined>();
  const { getChildrenTodos, updates } = useIndexedDB();
  const { isSettings, toggleSettings } = useSettings();

  const initChildren = async () => {
    if (getChildrenTodos) {
      const childrenTodos = await getChildrenTodos(parentId);
      if (childrenTodos) setChildTodos(childrenTodos);
    }
  };
  useEffect(() => {
    initChildren();
  }, []);

  useEffect(() => {
    initChildren();
  }, [updates]);

  const handleSortSelect = (filterFunc: (todos: TodoItem[]) => string[]) => {
    if (childTodos) {
      const newChildIds = filterFunc(childTodos);
      onSort(newChildIds);
    }
  };

  return (
    <div className="max-w-four">
      {isSettings && <SettingsComp />}
      <div className="grid grid-cols-6">
        <div className="flex flex-col justify-between">
          {back && (
            <a href="/" title="back">
              <TiArrowBack size="2rem" className="cursor-pointer style-color" />
            </a>
          )}
        </div>
        <div className="flex flex-col col-span-5 gap-2xsmall">
          <div className="flex items-center justify-end gap-2xsmall">
            {/* <DeleteToggle />
            <DarkModeToggle /> */}
            <button onClick={toggleSettings}>
              <IoMdSettings size={"1.5rem"}  className="style-color"/>
            </button>
          </div>
          <div className="flex justify-end gap-2xsmall">
            <SortBox onSortSelect={handleSortSelect} />
            {/* <UndoRedo /> */}
          </div>
        </div>
      </div>
      <div className="page-control-text-container header-style mt-3xsmall" dangerouslySetInnerHTML={{ __html: title }}></div>
    </div>
  );
};

interface SortBoxProps {
  onSortSelect: (filterFunction: (todos: TodoItem[]) => string[]) => void;
}

const SortBox: React.FC<SortBoxProps> = ({ onSortSelect }) => {
  // const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    // setSelectedValue(event.target.value);
    switch (value) {
      case "last-created":
        onSortSelect(sortTodosByLastCreated);
        break;
      case "oldest-created":
        onSortSelect(sortTodosByOldestCreated);
        break;
      case "last-updated":
        onSortSelect(sortTodosByLastUpdated);
        break;
      case "oldest-updated":
        onSortSelect(sortTodosByOldestUpdated);
        break;
      case "a-z":
        onSortSelect(sortTodosAZ);
        break;
      case "z-a":
        onSortSelect(sortTodosZA);
        break;
      default:
        break;
    }
  };

  const handelClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    event.currentTarget.value = "";
  };
  return (
    <div className="flex items-center justify-end h-small ">
      <select onClick={handelClick} onChange={handleChange} className="h-small px-2 sort-style">
        <option value="">No Sort</option>
        <option value="last-created">New - Old</option>
        <option value="oldest-created">Old - New</option>
        {/* <option value="last-updated">Last Updated</option>
          <option value="oldest-updated">Old Updated</option> */}
        <option value="a-z">A - Z</option>
        <option value="z-a">Z - A</option>
      </select>
    </div>
  );
};

const UndoRedo: React.FC = () => {
  return (
    <div className="flex justify-end h-small items-center  gap-3xsmall mr-3xsmall">
      <button title="undo" onClick={() => {}}>
        <FaUndo />
      </button>
      <button title="redo" onClick={() => {}}>
        <FaRedo />
      </button>
    </div>
  );
};

export default PageHeaderControls;
