import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import intialData from "../../misc/initalData";
import { MdDragHandle, MdDelete } from "react-icons/md";
import { useIndexedDB } from "../../context/IndexedDBContext";
import { DynamicText } from "..";

interface TodoItemProps {
  todoItemId: string;
  index: number;
  parentId: string;
  onDelete: (delId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todoItemId, parentId, index, onDelete }) => {
  const [content, setContent] = useState("");
  const { getTodo, updateTodo } = useIndexedDB();

  useEffect(() => {
    const initTodoItem = async () => {
      if (getTodo) {
        const todoItem = await getTodo(todoItemId);
        setContent(todoItem.content);
      }
    };
    initTodoItem();
  }, []);

  const handleChange = (html: string) => {
    if (updateTodo) {
      updateTodo({ id: todoItemId, content: html }, parentId);
    }
  };

  return (
    <Draggable index={index} draggableId={todoItemId}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} className="min-h-small mt-2xsmall max-w-four bg-blue-500 text-white flex">
          <DynamicText secondaryElement="p" className="w-full p-3xsmall" onChange={handleChange} isEditable={true} content={content}></DynamicText>
          <button aria-label="Delete" onClick={() => onDelete(todoItemId)} className="bg-blue-900 flex items-center w-small justify-center">
            <MdDelete className="w-xsmall h-xsmall" />
          </button>
          <div {...provided.dragHandleProps} className="bg-blue-900 flex items-center w-small justify-center">
            <MdDragHandle className="w-xsmall h-xsmall" />
          </div>
        </div>
      )}
    </Draggable>
  );

  // ;
};

export default TodoItem;
