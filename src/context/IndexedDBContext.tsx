import React, { useContext, createContext, useState } from "react";
import { useEffect } from "react";
import { openDB } from "idb";
import initialStoreData from "../misc/intialStoreData";
import { generateUID } from "../utils";
import { PageProps } from "gatsby";

interface TodoItem {
  id: string;
  content: string;
  date_created: number;
  date_updated: number;
  todoIds?: string[];
  currentTheme?: string;
  deleteMode?: boolean;
  darkMode?: boolean;
}

type KeyValuePair = {
  key: string;
  value: string | boolean;
};

interface IndexedDBContextType {
  addTodo: (parentId: string) => Promise<string>;
  updateTodo: (data: { id: string; content: string }, parentId: string) => void;
  deleteTodo: (id: string, parentId: string) => void;
  getTodo: (id: string) => Promise<TodoItem>;
  getChildrenTodos: (parentId: string) => Promise<TodoItem[]>;
  updateTodoPosition: (array: string[], parentId: string) => void;
  updates: number;
  updateSettings: ({ key, value }: KeyValuePair) => void;
}

const defaultContextValue: Partial<IndexedDBContextType> = {
  // Default values or dummy functions; could also be undefined
  addTodo: undefined,
  updateTodo: undefined,
  deleteTodo: undefined,
  getTodo: undefined,
  getChildrenTodos: undefined,
  updateTodoPosition: undefined,
  updateSettings: undefined,
  updates: undefined,
};

const IndexedDBContext = createContext<Partial<IndexedDBContextType>>(defaultContextValue);

export const IndexedDBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [updates, setUpdates] = useState(0);

  const dbName = "TodoDB";
  const storeName = "TodoStore";
  const version = 1; // Increment this when changing the database schema

  const incrementUpdates = () => {
    setUpdates((num) => num + 1);
  };

  // Initialize the database
  const initDB = async () => {
    const db = await openDB(dbName, version, {
      upgrade(db) {
        console.log("Upgrade function is running");
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: "id" });
          // Note: Do not attempt to add data here
        }
      },
    });

    // After the upgrade, check if initial data needs to be added
    const tx = await db.transaction(storeName, "readwrite");
    const store = await tx.objectStore(storeName);
    const count = await store.count();
    if (count === 0) {
      await initialStoreData.forEach((obj) => {
        store.add(obj);
      });
      await tx.done; // Ensure the transaction completes
    }
  };

  useEffect(() => {
    initDB();
  }, []);

  // Get data from the database
  const getTodo = async (id: string) => {
    await initDB();
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const data = await store.get(id);
    await tx.done;
    return data;
  };

  const addTodo = async (parentId: string) => {
    //Get new id to distribute to mainIds and to creation of the Todo
    const newId = generateUID();
    //Open the store
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    //Register the store
    const store = tx.objectStore(storeName);
    // Add new Todo to the store
    await store.add({ id: newId, content: "", todoIds: [], date_updated: Date.now(), date_created: Date.now() });

    //Get mainIds from the store
    const parentTodo = await store.get(parentId);
    if (!parentTodo) {
      throw new Error("Todo not found");
    }

    //Update mainIds to add new todo Id
    await store.put({ ...parentTodo, id: parentId, todoIds: [...parentTodo.todoIds, newId], date_updated: Date.now() });

    incrementUpdates();
    //Finish transaction
    await tx.done;
    return newId;
  };

  const updateTodo = async (data: { id: string; content: string }, parentId: string) => {
    // Open store
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    // Retrieve the existing todo object
    const existingTodo = await store.get(data.id);
    if (!existingTodo) {
      throw new Error("Todo not found");
    }
    const parentTodo = await store.get(data.id);
    if (!parentTodo) {
      throw new Error("Todo not found");
    }

    //Update the parents updated_date when child updates
    const updatedParent = { ...parentTodo, date_updated: Date.now() };

    // Merge the existing object with the new data
    const updatedTodo = { ...existingTodo, ...data, date_updated: Date.now() };

    incrementUpdates();
    // Put the merged objects back into the store
    await store.put(updatedParent);
    await store.put(updatedTodo);
    await tx.done;
  };

  const updateTodoPosition = async (array: string[], parentId: string) => {
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    // Retrieve the existing todo object
    const parentTodo = await store.get(parentId);
    if (!parentTodo) {
      throw new Error("Todo not found");
    }
    const updatedTodo = { ...parentTodo, todoIds: array };
    await store.put(updatedTodo);
    await tx.done;
  };

  const deleteTodo = async (id: string, parentId: string) => {
    //Open Store
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    // Retrieve the existing todo object
    const parentTodo = await store.get(parentId);

    //Get Parent array
    if (!parentTodo) {
      throw new Error("Todo not found");
    }
    // Filter that array
    // console.log(parentTodo);
    const filteredArr = [...parentTodo.todoIds].filter((item: string) => id !== item);

    incrementUpdates();
    // Update parent with new array
    await store.put({ ...parentTodo, todoIds: filteredArr });
    await store.delete(id);
    await tx.done;
  };

  const getChildrenTodos = async (parentId: string): Promise<any[]> => {
    await initDB();
    // Open the database
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);

    const parentTodo = await store.get(parentId);
    //Get Parent array
    if (!parentTodo) {
      // throw new Error("Todo not found ==> " + parentId);
      await tx.done;
      return [];
    }
    // Use Promise.all to fetch all records in parallel
    const records = await Promise.all(parentTodo.todoIds.map((id: string) => store.get(id)));

    await tx.done;
    return records; // This will be an array of found records
  };

  const updateSettings = async ({ key, value }: KeyValuePair) => {
    //Takes an object and
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    // Retrieve the existing todo object
    const settingsObj = await store.get("settings");

    //Get Parent array
    if (!settingsObj) {
      throw new Error("Todo not found");
    }

    const updatedSettings = { ...settingsObj, [key]: value };

    await store.put(updatedSettings);
    await tx.done;
  };

  return <IndexedDBContext.Provider value={{ updateSettings, addTodo, updateTodo, deleteTodo, getTodo, getChildrenTodos, updateTodoPosition, updates }}>{children}</IndexedDBContext.Provider>;
};

export const useIndexedDB = () => useContext(IndexedDBContext);
