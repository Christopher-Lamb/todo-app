import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

interface TodoItemProps {
  todoItemId: string;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todoItemId, index }) => {
  const [content, setContent] = useState("");

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
        <div ref={provided.innerRef} {...provided.draggableProps} className="min-h-small w-four bg-blue-500 text-white flex">
          <div className="w-full p-3xsmall" onBlur={handleChange} onKeyDown={handleKeyDown} contentEditable={true} dangerouslySetInnerHTML={{ __html: content }}></div>
          <div {...provided.dragHandleProps} className="bg-blue-900 flex items-center">
            Handle
          </div>
        </div>
      )}
    </Draggable>
  );

  // ;
};

export default TodoItem;
