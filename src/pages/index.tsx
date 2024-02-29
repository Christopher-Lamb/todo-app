import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Todo, PageHeaderControls, TodoContainer } from "../components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { IoIosAdd } from "react-icons/io";
import initalData from "../misc/initalData.ts";
import { moveItemDND, generateUID } from "../utils";
import useIndexedDB from "../hooks/useIndexedDB.tsx";

const IndexPage: React.FC<PageProps> = () => {
  const [mainIds, setMainIds] = useState<string[]>([]);
  const { getChildrenTodos, getTodo, addTodo, deleteTodo, updateTodoPosition } = useIndexedDB();

  useEffect(() => {
    const initTodos = async () => {
      // setMainIds(initalData.mainIds);
      const mainIds = await getTodo("mainIds");
      setMainIds(mainIds.todoIds);
    };

    initTodos();
    //TODO: Get mainIds from indexedDB
    //Track updates with state and update to indexedDB accordingly
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const newArr = moveItemDND(mainIds, result);
    if (newArr) {
      setMainIds(newArr);
      updateTodoPosition(newArr, "mainIds");
    }
  };

  const handleAdd = async () => {
    const newId = await addTodo("mainIds");
    setMainIds((mIds) => [...mIds, newId]);
  };

  const handleDelete = (delId: string) => {
    deleteTodo(delId, "mainIds");
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
