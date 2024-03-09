const mockUseIndexedDB = jest.fn();

export const mockIndexedDBContext = {
  useIndexedDB: () => ({
    getTodo: jest.fn().mockResolvedValue({ id: "todo-1", content: "<h3>Sample Todo</h3>" }),
  }),
};

export const IndexedDBContext = React.createContext(mockIndexedDBContext);
