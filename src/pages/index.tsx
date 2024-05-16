import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Todo, PageHeaderControls, TodoContainer } from "../components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { IoIosAdd } from "react-icons/io";
import initalData from "../misc/initalData.ts";
import { moveItemDND, generateUID } from "../utils";
import { useIndexedDB } from "../context/IndexedDBContext.tsx";
import { Helmet } from "react-helmet";

const IndexPage: React.FC<PageProps> = () => {
  const [mainIds, setMainIds] = useState<string[]>([]);
  const { getChildrenTodos, getTodo, addTodo, deleteTodo, updateTodoPosition } = useIndexedDB();

  useEffect(() => {
    const initTodos = async () => {
      if (!getTodo) return;
      const mainIds = await getTodo("mainIds");
      if (mainIds) {
        // console.log("BANG", mainIds);
        setMainIds(mainIds.todoIds ?? []);
      }
    };
    initTodos();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const newArr = moveItemDND(mainIds, result);
    if (newArr && updateTodoPosition) {
      setMainIds(newArr);
      updateTodoPosition(newArr, "mainIds");
    }
  };

  const handleAdd = async () => {
    if (!addTodo) return;
    const newId = await addTodo("mainIds");
    setMainIds((mIds) => [...mIds, newId]);
  };

  const handleDelete = (delId: string) => {
    if (!deleteTodo) return;
    deleteTodo(delId, "mainIds");
    setMainIds((mIds) => mIds.filter((item) => item !== delId));
  };

  const handleSort = (newIds: string[]) => {
    if (updateTodoPosition) {
      setMainIds(newIds);
      updateTodoPosition(newIds, "mainIds");
    }
  };

  return (
    <>
    <Helmet>
      <title>To Do App</title>
    </Helmet>
      <main className="mt-large lg:mt-one px-2xsmall lg:px-0 w-full">
        <div className="mx-auto max-w-four">
          <PageHeaderControls title="<h3>To do's</h3>" parentId="mainIds" onSort={handleSort} />
          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoContainer todoContainerId="index">
              {mainIds.map((todo, i) => (
                <Todo key={todo} todoId={todo} index={i} onDelete={handleDelete} />
              ))}
            </TodoContainer>
          </DragDropContext>
          <button title="Add Todo" className="max-w-four mt-2xsmall add-btn-style flex items-center justify-center w-full h-small cursor-pointer opacity-80 hover:opacity-100" onClick={handleAdd}>
            <IoIosAdd className="w-small h-small" />
          </button>
        </div>
      </main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>To Do App</title>;
