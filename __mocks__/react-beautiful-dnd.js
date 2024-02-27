// __mocks__/react-beautiful-dnd.js
import React from "react";

export const DragDropContext = ({ children }) => <div>{children}</div>;
export const Droppable = ({ children }) =>
  children(
    (provided, snapshot) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {children}
      </div>
    ),
    {}
  );
export const Draggable = ({ children, index }) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: React.createRef() }, { isDragging: false }, index);
