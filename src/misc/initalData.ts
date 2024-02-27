type TodoItem = {
  content: string;
  todoItemIds: string[];
};

// Define the structure for the todos and todoItems objects
interface Todos {
  [key: string]: TodoItem;
}

interface TodoItems {
  [key: string]: {
    content: string;
  };
}

interface InitalData {
  mainIds: string[];
  todos: Todos;
  todoItems: TodoItems;
}

const intialData: InitalData = {
  mainIds: ["todo-1", "todo-2", "todo-3"],
  todos: {
    "todo-1": {
      content: "To Do 1",
      todoItemIds: ["todoItem-1", "todoItem-2", "todoItem-3"],
    },
    "todo-2": {
      content: "To Do 2",
      todoItemIds: ["todoItem-4", "todoItem-5", "todoItem-6"],
    },
    "todo-3": {
      content: "To Do 3",
      todoItemIds: ["todoItem-7", "todoItem-8", "todoItem-9"],
    },
  },
  todoItems: {
    "todoItem-1": { content: "To do Item 1" },
    "todoItem-2": { content: "To do Item 2" },
    "todoItem-3": { content: "To do Item 3" },
    "todoItem-4": { content: "To do Item 4" },
    "todoItem-5": { content: "To do Item 5" },
    "todoItem-6": { content: "To do Item 6" },
    "todoItem-7": { content: "To do Item 7" },
    "todoItem-8": { content: "To do Item 8" },
    "todoItem-9": { content: "To do Item 9" },
    "todoItem-10": { content: "To do Item 10" },
  },
};
export default intialData;
