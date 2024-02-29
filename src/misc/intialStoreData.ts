interface DBItem {
  id: string;
  array?: string[];
  content?: string;
  todoIds?: string[];
  date_created?: number;
  date_updated?: number;
}
const intialStoreData: DBItem[] = [
  { id: "mainIds", todoIds: ["todo-1", "todo-2"] },
  { id: "todo-1", content: "A To Do 1", todoIds: ["todoItem-1", "todoItem-2", "todoItem-3"], date_created: Date.now(), date_updated: Date.now() },
  { id: "todo-2", content: "B To Do 2", todoIds: ["todoItem-4", "todoItem-5", "todoItem-6"], date_created: Date.now(), date_updated: Date.now() },
  { id: "todoItem-1", content: "A To do Item 1", date_created: Date.now(), date_updated: Date.now() },
  { id: "todoItem-2", content: "B To do Item 2", date_created: Date.now(), date_updated: Date.now() },
  { id: "todoItem-3", content: "C To do Item 3", date_created: Date.now(), date_updated: Date.now() },
  { id: "todoItem-4", content: "A To do Item 4", date_created: Date.now(), date_updated: Date.now() },
  { id: "todoItem-5", content: "B To do Item 5", date_created: Date.now(), date_updated: Date.now() },
  { id: "todoItem-6", content: "C To do Item 6", date_created: Date.now(), date_updated: Date.now() },
];

export default intialStoreData;
