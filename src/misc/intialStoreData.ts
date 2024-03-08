interface DBItem {
  id: string;
  array?: string[];
  content?: string;
  todoIds?: string[];
  date_created?: number;
  date_updated?: number;
  currentTheme?: string;
  deleteMode?: boolean;
  darkMode?: boolean;
}
const intialStoreData: DBItem[] = [
  { id: "mainIds", todoIds: ["todo-1"] },
  { id: "settings", currentTheme: "default", deleteMode: true, darkMode: false },
  { id: "todo-1", content: "<h3>Example To do</h3><span style='display:block;'>Sub text</span>", todoIds: ["todoItem-1"], date_created: Date.now(), date_updated: Date.now() },
  { id: "todoItem-1", content: "<p>Example To do Item</p>", date_created: Date.now(), date_updated: Date.now() },
];

export default intialStoreData;
