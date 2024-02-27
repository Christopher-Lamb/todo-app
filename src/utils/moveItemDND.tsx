import { DropResult } from "react-beautiful-dnd";

const moveItemDND = (array: string[], result: DropResult) => {
  const { destination, source, draggableId } = result;
  if (!destination) {
    // If there's no destination (dragged outside of any droppable)
    // you might want to handle this case.
    return;
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    // If the item is dropped in the same place it was dragged from
    return;
  }
  if (destination.droppableId === source.droppableId && destination.index !== source.index) {
    let workingArr = [...array];
    workingArr?.splice(source.index, 1);
    workingArr.splice(destination.index, 0, draggableId);
    return workingArr;
  }
};

export default moveItemDND;
