import { useEffect } from "react";
import { openDB } from "idb";

const useIndexedDB = () => {
  const dbName = "TodoDB";
  const storeName = "MyObjectStore";
  const version = 1; // Increment this when changing the database schema

  // Initialize the database
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(dbName, version, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
          }
        },
      });
    };

    initDB();
  }, []);

  // Add data to the database
  const addData = async (data: any) => {
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.add(data);
    await tx.done;
  };

  // Get data from the database
  const getData = async (id: string) => {
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const data = await store.get(id);
    await tx.done;
    return data;
  };

  // Update data in the database
  const updateData = async (data: any) => {
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.put(data);
    await tx.done;
  };

  // Delete data from the database
  const deleteData = async (id: string) => {
    const db = await openDB(dbName, version);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.delete(id);
    await tx.done;
  };

  return { addData, getData, updateData, deleteData };
};

export default useIndexedDB;
