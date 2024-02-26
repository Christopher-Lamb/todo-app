import React from "react";
import { Droppable } from "react-beautiful-dnd";

interface TodoContainerProps {
  children: React.ReactNode;
  todoContainerId: string;
}

const TodoContainer: React.FC<TodoContainerProps> = ({ children, todoContainerId }) => {
  return (
    <Droppable droppableId={todoContainerId}>
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="grid gap-2xsmall">
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoContainer;
