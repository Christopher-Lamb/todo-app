import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import intialData from "../../misc/initalData";
import { MdDragHandle, MdDelete } from "react-icons/md";

interface TodoItemProps {
  todoItemId: string;
  index: number;
  onDelete: (delId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todoItemId, index, onDelete }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (todoItemId in intialData.todoItems) {
      setContent(intialData.todoItems[todoItemId].content);
    }
  }, []);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    setContent(event.currentTarget.innerHTML || "");
    console.log(event.currentTarget.innerHTML);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.execCommand("insertHTML", false, "<p><br></p>");
    }
  };

  return (
    <Draggable index={index} draggableId={todoItemId}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} className="min-h-small mt-2xsmall w-four bg-blue-500 text-white flex">
          <div className="w-full p-3xsmall" onBlur={handleChange} onKeyDown={handleKeyDown} contentEditable={true} dangerouslySetInnerHTML={{ __html: content }}></div>
          <button onClick={() => onDelete(todoItemId)} className="bg-blue-900 flex items-center w-small justify-center">
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
