import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Todo, PageHeaderControls, TodoContainer, TodoItem } from "../components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import initalData from "../misc/initalData.ts";
import { IoIosAdd } from "react-icons/io";
import { generateUID, moveItemDND } from "../utils/";
import { useIndexedDB } from "../context/IndexedDBContext.tsx";

const TodoListPage: React.FC<PageProps> = () => {
  const todoId = location.pathname.replaceAll("/", "");
  // const todoContent = initalData.todos[todoId] ? initalData.todos[todoId].content : "Error";
  const [todoItems, setTodoItems] = useState<string[]>([]);
  const [todoContent, setTodoContent] = useState("");
  const [fallback, setFallback] = useState(false);
  const { getTodo, addTodo, deleteTodo, updateTodoPosition } = useIndexedDB();

  useEffect(() => {
    //TODO: Load the ids from I
    const initTodoItems = async () => {
      if (!getTodo) return;
      const todo = await getTodo(todoId);
      if (todo) {
        setTodoContent(todo.content);
        setTodoItems(todo.todoIds ?? []);
      } else {
        setFallback(true);
      }
    };
    initTodoItems();
  }, []);

  const handleAddItem = async () => {
    if (!addTodo) return;
    const newId = await addTodo(todoId);
    setTodoItems((ti) => [...ti, newId]);
  };

  const handleDelete = (delId: string) => {
    if (!deleteTodo) return;
    deleteTodo(delId, todoId);
    setTodoItems((ti) => ti.filter((item) => item !== delId));
  };

  const handleDragEnd = (result: DropResult) => {
    const newArr = moveItemDND(todoItems, result);
    if (newArr && updateTodoPosition) {
      updateTodoPosition(newArr, todoId);
      setTodoItems(newArr);
    }
  };

  const handleSort = (newIds: string[]) => {
    if (updateTodoPosition) {
      setTodoItems(newIds);
      updateTodoPosition(newIds, todoId);
    }
  };

  return (
    <>
      {fallback ? (
        <main className="mt-one min-h-two flex justify-center">
          <div className="border border-4 pt-med border-red-600 p-small bg-red-50 shadow">
            <a href="/">
              <span className="text-blue-600 underline">back</span>
            </a>
            <h1 className="text-one">Oh no...</h1>
            <p className="text-med">It appears that the "To Do" you're looking for does not exist.</p>
          </div>
        </main>
      ) : (
        <main className="2xl:max-w-four mt-one bg-blue-100 mx-auto grid justify-center">
          <PageHeaderControls title={todoContent} parentId={todoId} onSort={handleSort} />
          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoContainer todoContainerId="index">
              {todoItems && todoItems.map((todoItemId, i) => <TodoItem key={todoItemId} parentId={todoId} todoItemId={todoItemId} index={i} onDelete={handleDelete} />)}
            </TodoContainer>
          </DragDropContext>
          <div className="w-four mt-2xsmall outline outline-gray-600 bg-gray-200 flex items-center justify-center h-small cursor-pointer" onClick={handleAddItem}>
            <IoIosAdd className="w-small h-small text-gray-600" />
          </div>
        </main>
      )}
    </>
  );
};

export default TodoListPage;

export const Head: HeadFC = () => <title>Todo List</title>;
