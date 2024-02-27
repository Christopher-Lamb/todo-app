import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import intialData from "../../misc/initalData";
import { MdDragHandle, MdEdit, MdDelete } from "react-icons/md";

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

  useEffect(() => {
    if (todoId in intialData.todos) {
      setContent(intialData.todos[todoId].content);
    }
  }, []);

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCanEdit((ce) => !ce);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(todoId);
  };

  const handleClick = () => {
    if (!canEdit) {
      // location.href = "/" + todoId;
    }
  };
  const handleChange = (content: string) => {
    setContent(content);
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
          <h3 contentEditable={canEdit} className="w-full text-med p-3xsmall">
            {content}
          </h3>
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
