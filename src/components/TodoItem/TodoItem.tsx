import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import intialData from "../../misc/initalData";
import { MdDragHandle, MdDelete } from "react-icons/md";
import { useIndexedDB } from "../../context/IndexedDBContext";
import { DynamicText } from "..";
import { useSettings } from "../../context/SettingsContext";
import "./TodoItem.css";

interface TodoItemProps {
  todoItemId: string;
  index: number;
  parentId: string;
  onDelete: (delId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todoItemId, parentId, index, onDelete }) => {
  const [content, setContent] = useState("");
  const { getTodo, updateTodo } = useIndexedDB();
  const { deleteMode } = useSettings();

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
        <div ref={provided.innerRef} {...provided.draggableProps} className="min-h-small mt-2xsmall max-w-four todo-item-style text-white flex">
          <DynamicText primaryElement="h4" secondaryElement="p" className="w-full p-3xsmall todo-item-text" onChange={handleChange} isEditable={true} content={content}></DynamicText>
          {deleteMode && (
            <button aria-label="Delete" onClick={() => onDelete(todoItemId)} className="flex items-center w-small justify-center">
              <MdDelete className="w-xsmall h-xsmall" />
            </button>
          )}
          <div {...provided.dragHandleProps} className="flex items-center w-small justify-center">
            <MdDragHandle className="w-xsmall h-xsmall" />
          </div>
        </div>
      )}
    </Draggable>
  );

  // ;
};

export default TodoItem;
