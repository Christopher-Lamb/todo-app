import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import useIndexedDB from "../hooks/useIndexedDB";
import { generateUID } from "../utils";

const TestPage: React.FC<PageProps> = () => {
  const { addTodo, updateTodo, deleteTodo, getTodo, getChildrenTodos } = useIndexedDB();

  const handleAddTodo = async () => {
    addTodo("todo-2");
  };
  const handleAddTodoItem = () => {
    addTodo("todo-1");
  };

  const handleDeleteTodo = () => {
    deleteTodo("todo-1", "mainIds");
    deleteTodo("todoItem-4", "todo-2");
  };

  const handleGetTodo = async () => {
    console.log("==>", await getTodo("todo-2"));
  };

  const handleUpdateTodo = () => {
    updateTodo({ id: "todo-2", content: "Penis" });
  };

  const handleChildrenTodos = async () => {
    const childrenTodos = await getChildrenTodos("todo-2");
    console.log(childrenTodos);
  };

  return (
    <div className="mt-one w-full grid grid-cols-2s w-three mx-auto gap-2xsmall justify-center items-center select-none">
      <Button color="blue" onClick={handleAddTodo}>
        Add Todo
      </Button>
      <Button onClick={handleAddTodoItem} color="light-blue">
        Add TodoItem
      </Button>
      <Button onClick={handleGetTodo} color="green">
        Get Todo
      </Button>
      {/* <Button color="light-green">Get TodoItem</Button> */}
      <Button onClick={handleUpdateTodo} color="purple">
        Update Todo
      </Button>
      {/* <Button color="light-purple">Update Todo Item</Button> */}
      <Button onClick={handleDeleteTodo} color="red">
        Delete Todo
      </Button>{" "}
      <Button onClick={handleChildrenTodos} color="rose">
        Children Todos
      </Button>
      {/* <Button color="light-red">Delete TodoItem</Button> */}
    </div>
  );
};

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void; color: string }> = ({ children, onClick, color }) => {
  let btnClass: string = "px-4 bg-gray-100 py-2 rounded-md hover:translate-y-[-1px] active:translate-y-px shadow ";

  switch (color) {
    case "red":
      btnClass += "bg-red-500 text-white";
      break;
    case "light-red":
      btnClass += "bg-red-300 text-black";
      break;
    case "blue":
      btnClass += "bg-blue-600 text-white";
      break;
    case "light-blue":
      btnClass += "bg-blue-300 text-black";
      break;
    case "green":
      btnClass += "bg-green-500 text-white";
      break;
    case "light-green":
      btnClass += "bg-green-200 text-black";
      break;
    case "purple":
      btnClass += "bg-purple-600 text-white";
      break;
    case "light-purple":
      btnClass += "bg-purple-300 text-black";
      break;
    case "orange":
      btnClass += "bg-orange-600 text-white";
      break;
    case "rose":
      btnClass += "bg-rose-300 text-slate-700";
      break;
    case "gray":
      btnClass += "bg-gray-600 text-white";
      break;
    default:
      btnClass += "";
      break;
  }

  return (
    <button className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default TestPage;

export const Head: HeadFC = () => {
  return (
    <>
      <title>Test Page</title>
    </>
  );
};
