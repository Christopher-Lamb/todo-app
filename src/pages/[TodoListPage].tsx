import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { PageHeaderControls, TodoContainer, TodoItem } from "../components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
// import initalData from "../misc/initalData.ts";
import { IoIosAdd } from "react-icons/io";
import { moveItemDND } from "../utils/";
import { useIndexedDB } from "../context/IndexedDBContext.tsx";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

const getH3 = (htmlStr: string) => {
  const content = htmlStr.match(/\<h3\>(.*?)\<\/h3\>/g) || [""];
  const text = content[0].replaceAll(/\<.*?h3.*?\>/g, "");
  if (text) {
    return "| " + text;
  }
};

const TodoListPage: React.FC<PageProps> = () => {
  const todoId =
    typeof location !== "undefined"
      ? location.pathname
          .split("/")
          .filter((i) => i)
          .pop() || ""
      : "";
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
      <Helmet>
        <title>To Do {getH3(todoContent) || ""}</title>
      </Helmet>
      {fallback ? (
        <main className="mt-one min-h-two flex justify-center">
          <div className="border border-4 pt-med border-red-600 p-small bg-red-50 shadow">
            <Link to="/">
              <TiArrowBack size="2rem" className="cursor-pointer" />
              {/* <span className="text-blue-600 underline">back</span> */}
            </Link>
            <h1 className="text-one">Oh no...</h1>
            <p className="text-med">It appears that the "To Do" you're looking for does not exist.</p>
          </div>
        </main>
      ) : (
        <main className="mt-large lg:mt-one px-2xsmall lg:px-0 w-full">
          <div className="mx-auto max-w-four">
            <PageHeaderControls title={todoContent} parentId={todoId} onSort={handleSort} back />
            <DragDropContext onDragEnd={handleDragEnd}>
              <TodoContainer todoContainerId="index">
                {todoItems && todoItems.map((todoItemId, i) => <TodoItem key={todoItemId} parentId={todoId} todoItemId={todoItemId} index={i} onDelete={handleDelete} />)}
              </TodoContainer>
            </DragDropContext>
            <div className="max-w-four mt-2xsmall add-btn-style flex items-center justify-center h-small cursor-pointer opacity-80 hover:opacity-100" onClick={handleAddItem}>
              <IoIosAdd className="w-small h-small" />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default TodoListPage;

export const Head: HeadFC = () => <title>To do List</title>;
