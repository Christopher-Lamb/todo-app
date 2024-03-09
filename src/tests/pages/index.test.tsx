import React from "react";
import { render, waitFor } from "@testing-library/react";
import IndexPage from "../../pages";
import { PageProps } from "gatsby";
import { Location } from "@reach/router";
import userEvent from "@testing-library/user-event";

// At the top of your test file
jest.mock("gatsby", () => ({
  ...jest.requireActual("gatsby"), // This keeps other gatsby exports
  navigate: jest.fn(), // Mock navigate function
}));

const mockLocation = {
  pathname: "/",
  search: "",
  hash: "",
  state: {},
  key: "initial", // Gatsby's location object includes a 'key' property
  href: "http://localhost/",
  origin: "http://localhost",
  protocol: "http:",
  host: "localhost",
  hostname: "localhost",
  port: "80",
  ancestorOrigins: {} as DOMStringList, // These are additional properties expected by the WindowLocation type
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  toString: jest.fn(),
}; // This type assertion aligns the mock with Gatsby's expected type

const mockNavigate = jest.fn();

// Adjust <DataType, PageContextType> generics based on your needs
const mockProps: PageProps<any, any> = {
  path: "/test-path",
  uri: "/test-uri",
  location: mockLocation,
  params: {},
  pageResources: {} as any, // Use 'as any' for simplicity
  data: {}, // Adjust based on your needs
  pageContext: {}, // Adjust if necessary
  children: undefined, // Set to undefined if not used, or provide actual mock React nodes if used
  serverData: {} as any, // Add this if you're using Gatsby's Deferred Static Generation (DSG)
};
let mockStore: Record<string, any>;

const initialMockStore: Record<string, any> = {
  mainIds: { id: "mainIds", content: "", todoIds: ["todo-1", "todo-2", "todo-3"] },
  settings: { id: "settings", darkMode: false, deleteMode: true, currentTheme: "default" },
  "todo-1": { id: "todo-1", content: "<h4>A Todo 1</h4>", todoIds: [] },
  "todo-2": { id: "todo-2", content: "<h4>B Todo 2</h4>", todoIds: [] },
  "todo-3": { id: "todo-3", content: "<h4>C Todo 4</h4>", todoIds: [] },
};

beforeEach(() => {
  // Deep copy the initialMockStore to ensure isolation between tests
  jest.clearAllMocks();
  mockStore = JSON.parse(JSON.stringify(initialMockStore));
});

// Assuming useIndexedDB is the only export from the file
jest.mock("../../context/IndexedDBContext", () => ({
  useIndexedDB: () => ({
    getTodo: jest.fn((id: string) => Promise.resolve(mockStore[id])), // Dynamically return data based on ID
    // Mock other functions as necessary
    addTodo: jest.fn(() => {
      // const newId = "new-todo";
      const newId = "new-todo-" + Date.now();
      mockStore[newId] = { id: newId, content: "NEW TODO" };
      mockStore["mainIds"] = { ...mockStore.mainIds, todoIds: [...mockStore.mainIds.todoIds, newId] };
      return newId;
    }),
    deleteTodo: jest.fn((delId: string, parentId: string) => {
      delete mockStore[delId];
      const newArr = [...mockStore.mainIds.todoIds].filter((id) => delId !== id);
      mockStore[parentId] = { ...mockStore.mainIds, todoIds: newArr };
    }),
  }),
}));

describe("Index Page", () => {
  test("Renders Index Page", async () => {
    const { getByRole, queryAllByLabelText } = render(<IndexPage {...mockProps} />);
    const pageHeading = await waitFor(() => getByRole("heading", { level: 3, name: "To do's" }));
    expect(pageHeading).toBeInTheDocument();
  });

  test("Renders all todos", async () => {
    const { getByRole, queryAllByLabelText } = render(<IndexPage {...mockProps} />);
    const firstTodo = await waitFor(() => getByRole("heading", { level: 4, name: "A Todo 1" }));
    expect(firstTodo).toBeInTheDocument();
    const allTodos = queryAllByLabelText("To do");
    expect(allTodos).toHaveLength(3);
  });

  test("add button", async () => {
    const { getByTitle, queryAllByLabelText } = render(<IndexPage {...mockProps} />);
    const addBtn = await waitFor(() => getByTitle("Add Todo"));
    //Add a new todo to mockStore
    await userEvent.click(addBtn);
    //Check to see if it was rendered correctly
    const allTodos = await waitFor(() => queryAllByLabelText("To do"));
    expect(allTodos).toHaveLength(4);
    // Check if add to the end of the list
    expect(allTodos[3]).toHaveTextContent("NEW TODO");
  });

  test("delete button", async () => {
    const { queryAllByLabelText } = render(<IndexPage {...mockProps} />);
    //Get inial Todos and Delete buttons
    let allTodos = await waitFor(() => queryAllByLabelText("To do"));
    const deleteBtns = await waitFor(() => queryAllByLabelText("Delete"));

    //Delete the first button
    await userEvent.click(deleteBtns[0]);
    allTodos = await waitFor(() => queryAllByLabelText("To do"));

    expect(allTodos).toHaveLength(2);

    //Check the new first todo is the old second todo
    expect(allTodos[0]).toHaveTextContent("B Todo 2");
  });

  // •~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•
  // React Beautiful DND not sure if i have to test this
  // Also no sure how to test this due to mocking and context
  // •~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•~~~~•
  // test("Move First Todo to Second Todo", async () => {
  //   const { container, findAllByLabelText } = render(<IndexPage {...mockProps} />);
  //   const dragHandles = await findAllByLabelText("Drag Handle");
  //   expect(dragHandles).toHaveLength(3);

  //   // expect(allTodos).toHaveLength(3);

  //   // await console.log(allHandles);
  //   const firstHandle = dragHandles[0];
  //   firstHandle.focus();
  //   await userEvent.keyboard("{Space}{ArrowDown}{Space}");
  //   const allTodos = await findAllByLabelText("To do");
  //   expect(allTodos[0]).toHaveTextContent("B Todo 2");
  // });
});
