interface TodoItem {
  id: string;
  content: string;
  date_created: number;
  date_updated: number;
}

const sortTodosAZ = (items: TodoItem[]): string[] => {
  return items
    .sort((a, b) => {
      // Replace spaces with a "" character for comparison purposes
      const aContent = a.content.replace(/(\&nbsp;)|(\s)/g, "");
      const bContent = b.content.replace(/(\&nbsp;)|(\s)/g, "");
      return aContent.localeCompare(bContent);
    })
    .map((item) => item.id);
};

const sortTodosZA = (items: TodoItem[]): string[] => {
  return items
    .sort((a, b) => {
      // Replace spaces with a "" character for comparison purposes
      const aContent = a.content.replace(/(\&nbsp;)|(\s)/g, "");
      const bContent = b.content.replace(/(\&nbsp;)|(\s)/g, "");
      return bContent.localeCompare(aContent);
    })
    .map((item) => item.id);
};
// Function to sort TodoItems by the order of last created (newest first)
const sortTodosByLastCreated = (items: TodoItem[]): string[] => {
  return items.sort((a, b) => b.date_created - a.date_created).map((item) => item.id);
};
// Function to sort TodoItems by the order of last created (oldest first)
const sortTodosByOldestCreated = (items: TodoItem[]): string[] => {
  return items.sort((a, b) => a.date_created - b.date_created).map((item) => item.id);
};

// Function to sort TodoItems by the order of last updated (newest first)
const sortTodosByLastUpdated = (items: TodoItem[]): string[] => {
  return items.sort((a, b) => b.date_updated - a.date_updated).map((item) => item.id);
};
// Function to sort TodoItems by the order of last updated (oldest first)
const sortTodosByOldestUpdated = (items: TodoItem[]): string[] => {
  return items.sort((a, b) => a.date_updated - b.date_updated).map((item) => item.id);
};

export { sortTodosAZ, sortTodosByLastCreated, sortTodosByLastUpdated, sortTodosZA, sortTodosByOldestUpdated, sortTodosByOldestCreated };
