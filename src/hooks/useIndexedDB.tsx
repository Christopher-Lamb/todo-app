import { useEffect } from "react";
import { openDB } from "idb";
import intialStoreData from "../misc/intialStoreData";
import { generateUID } from "../utils";

const useIndexedDB = () => {
  const dbName = "TodoDB";
  const storeName = "TodoStore";
  const version = 1; // Increment this when changing the database schema

  // Initialize the database
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(dbName, version, {
        upgrade(db, oldVersion, newVersion, transaction) {
          // Create object store if it doesn't exist
          let store: any;
          if (!db.objectStoreNames.contains(storeName)) {
            store = db.createObjectStore(storeName, { keyPath: "id" });
            intialStoreData.forEach((obj) => {
              store.add(obj);
            });
          } else {
            store = transaction.objectStore(storeName);
          }
        },
      });
    };

    initDB();
  }, []);

  // Get data from the database
  const getTodo = async (id: string) => {
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
    await store.add({ id: newId, content: "", todoIds: [] });

    //Get mainIds from the store
    const parentTodo = await store.get(parentId);
    if (!parentTodo) {
      throw new Error("Todo not found");
    }

    //Update mainIds to add new todo Id
    await store.put({ ...parentTodo, id: parentId, todoIds: [...parentTodo.todoIds, newId], date_updated: Date.now() });

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

    // Update parent with new array
    await store.put({ ...parentTodo, todoIds: filteredArr });
    await store.delete(id);
    await tx.done;
  };

  const getChildrenTodos = async (parentId: string): Promise<any[]> => {
    // Open the database
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);

    const parentTodo = await store.get(parentId);
    //Get Parent array
    if (!parentTodo) {
      throw new Error("Todo not found");
    }
    // Use Promise.all to fetch all records in parallel
    const records = await Promise.all(parentTodo.todoIds.map((id: string) => store.get(id)));

    await tx.done;
    return records; // This will be an array of found records
  };

  return { addTodo, updateTodo, deleteTodo, getTodo, getChildrenTodos, updateTodoPosition };
};

export default useIndexedDB;
