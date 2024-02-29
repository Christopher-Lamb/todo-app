import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import intialData from "../../misc/initalData";
import { MdDragHandle, MdDelete } from "react-icons/md";
import useIndexedDB from "../../hooks/useIndexedDB";

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
      const todoItem = await getTodo(todoItemId);
      setContent(todoItem.content);
    };
    initTodoItem();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    const value = event.target.innerHTML || "";
    updateTodo({ id: todoItemId, content: value }, parentId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        const newParagraph = document.createElement("p");
        newParagraph.appendChild(document.createElement("br"));
        range.insertNode(newParagraph);
        range.setStartAfter(newParagraph);
        range.setEndAfter(newParagraph);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <Draggable index={index} draggableId={todoItemId}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} className="min-h-small mt-2xsmall w-four bg-blue-500 text-white flex">
          <div aria-label="Text content" className="w-full p-3xsmall" onInput={handleChange} onKeyDown={handleKeyDown} contentEditable={true} dangerouslySetInnerHTML={{ __html: content }}></div>
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
