const mockUseIndexedDB = jest.fn();

export const mockIndexedDBContext = {
  useIndexedDB: mockUseIndexedDB,
};

export const IndexedDBContext = React.createContext(mockIndexedDBContext);
