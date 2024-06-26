import React, { useState, useEffect, ChangeEvent, useRef, MouseEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import intialData from "../../misc/initalData";
import { MdDragHandle, MdEdit, MdDelete } from "react-icons/md";
import { useIndexedDB } from "../../context/IndexedDBContext";
import { DynamicText } from "..";
import { navigateTo } from "../../utils";
import { useSettings } from "../../context/SettingsContext";
import "./Todo.css";

interface TodoProps {
  todoId: string;
  index: number;
  onDelete: (delId: string) => void;
}

const editingStyles = "todo-edit-style";
const normalStyles = "todo-item-style";

const Todo: React.FC<TodoProps> = ({ index, todoId, onDelete }) => {
  const [content, setContent] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const { getTodo, updateTodo } = useIndexedDB();
  const { deleteMode } = useSettings();

  useEffect(() => {
    //Initalize todo form IndexedDB and set content to the UI
    const initTodo = async () => {
      if (!getTodo) return;
      const todo = await getTodo(todoId);
      setContent(todo.content);
      if (todo.content === "") setCanEdit(true);
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
      navigateTo(todoId);
      // window.location.replace("/todo-app/" + todoId);
      // location.href = "/" + todoId;
    }
  };
  const handleChange = (html: string) => {
    if (!updateTodo) return;
    updateTodo({ id: todoId, content: html }, "mainIds");
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
          className={"min-h-small max-w-four flex mt-2xsmall cursor-pointer " + (canEdit ? editingStyles : normalStyles)}
        >
          <DynamicText primaryElement="h3" isEditable={canEdit} onChange={handleChange} className="w-full todo-text-container p-3xsmall" content={content}></DynamicText>
          {/* <div contentEditable={canEdit} onKeyDown={handleKeyDown} onInput={handleChange} className="w-full text-med p-3xsmall" dangerouslySetInnerHTML={{ __html: content }}></div> */}
          {deleteMode && (
            <button aria-label="Delete" className="flex items-center justify-center w-small cursor-pointer" onClick={handleDelete}>
              <MdDelete className="w-xsmall h-xsmall" />
            </button>
          )}
          <button aria-label="Edit Toggle" className="flex items-center justify-center w-small cursor-pointer" onClick={handleEdit}>
            <MdEdit className="w-xsmall h-xsmall" />
          </button>
          <div aria-label="Drag Handle" {...provided.dragHandleProps} className="w-small flex items-center justify-center">
            <MdDragHandle className="w-xsmall h-xsmall" />
          </div>
        </a>
      )}
    </Draggable>
  );
};

export default Todo;
