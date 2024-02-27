import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Todo, PageHeaderControls, TodoContainer } from "../components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { IoIosAdd } from "react-icons/io";
import initalData from "../misc/initalData.ts";
import { moveItemDND, generateUID } from "../utils";

const IndexPage: React.FC<PageProps> = () => {
  const [mainIds, setMainIds] = useState<string[]>([]);

  useEffect(() => {
    setMainIds(initalData.mainIds);
    //TODO: Get mainIds from indexedDB
    //Track updates with state and update to indexedDB accordingly
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const newArr = moveItemDND(mainIds, result);
    if (newArr) {
      setMainIds(newArr);
    }
  };

  const handleAdd = () => {
    setMainIds((mIds) => [...mIds, generateUID()]);
  };

  const handleDelete = (delId: string) => {
    setMainIds((mIds) => mIds.filter((item) => item !== delId));
  };

  return (
    <main className="2xl:max-w-four mt-one bg-blue-100 mx-auto grid justify-center">
      <PageHeaderControls title="Todo's" />
      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoContainer todoContainerId="index">
          {mainIds.map((todo, i) => (
            <Todo key={todo} todoId={todo} index={i} onDelete={handleDelete} />
          ))}
        </TodoContainer>
      </DragDropContext>
      <div className="w-four mt-2xsmall outline outline-gray-600 bg-gray-200 flex items-center justify-center h-small cursor-pointer" onClick={handleAdd}>
        <IoIosAdd className="w-small h-small text-gray-600" />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
