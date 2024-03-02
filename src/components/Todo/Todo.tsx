import React, { useState, useEffect, ChangeEvent, useRef, MouseEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import intialData from "../../misc/initalData";
import { MdDragHandle, MdEdit, MdDelete } from "react-icons/md";
import { useIndexedDB } from "../../context/IndexedDBContext";

interface TodoProps {
  todoId: string;
  index: number;
  onDelete: (delId: string) => void;
}

const editingStyles = "text-black bg-gray-200 outline outline-4 outline-black rounded";
const normalStyles = "text-white bg-blue-500";

const Todo: React.FC<TodoProps> = ({ index, todoId, onDelete }) => {
  const [content, setContent] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const { getTodo, updateTodo } = useIndexedDB();
  const contentEditableRef = useRef();

  useEffect(() => {
    //Initalize todo form IndexedDB and set content to the UI
    const initTodo = async () => {
      if (!getTodo) return;
      const todo = await getTodo(todoId);
      setContent(todo.content);
    };
    initTodo();
  }, []);

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCanEdit((ce) => !ce);
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(todoId);
  };

  const handleClick = () => {
    if (!canEdit) {
      location.href = "/" + todoId;
    }
  };
  const handleChange = (event: ChangeEvent<HTMLHeadingElement>) => {
    const value = event.target.innerHTML;
    if (!updateTodo) return;
    updateTodo({ id: todoId, content: value }, "mainIds");
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //   }
  // };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("Hello");
    if (event.key === "Enter") {
      event.preventDefault();
      const selection = window.getSelection();
      console.log(selection);
      if (selection) {
        const range = selection.getRangeAt(0);
        const newDiv = document.createElement("span");
        newDiv.style.fontSize = "1.125rem";
        newDiv.style.fontWeight = "100";
        newDiv.style.display = "block";
        // newDiv.appendChild(document.createElement("br"));
        range.insertNode(newDiv);
        range.setStartAfter(newDiv);
        range.setEndAfter(newDiv);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <Draggable index={index} draggableId={todoId}>
      {(provided, snapshot) => (
        <a
          aria-label="To do"
          ref={provided.innerRef}
          // href=""
          onClick={handleClick}
          {...provided.draggableProps}
          className={"min-h-small w-four flex mt-2xsmall " + (canEdit ? editingStyles : normalStyles)}
        >
          <div contentEditable={canEdit} onKeyDown={handleKeyDown} onInput={handleChange} className="w-full text-med p-3xsmall" dangerouslySetInnerHTML={{ __html: content }}></div>
          <button aria-label="Delete" className="flex items-center justify-center w-small cursor-pointer" onClick={handleDelete}>
            <MdDelete className="w-xsmall h-xsmall" />
          </button>
          <button aria-label="Edit Toggle" className="flex items-center justify-center w-small cursor-pointer" onClick={handleEdit}>
            <MdEdit className="w-xsmall h-xsmall" />
          </button>
          <div {...provided.dragHandleProps} className="w-small flex items-center justify-center">
            <MdDragHandle className="w-xsmall h-xsmall" />
          </div>
        </a>
      )}
    </Draggable>
  );
};

export default Todo;
