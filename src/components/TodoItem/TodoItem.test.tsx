import React from "react";
import { render, waitFor } from "@testing-library/react";
import TodoItem from "./TodoItem";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

// Assuming useIndexedDB is the only export from the file
jest.mock("../../context/IndexedDBContext", () => ({
  useIndexedDB: () => ({
    getTodo: jest.fn().mockResolvedValue({ id: "todoItem-1", content: "<h4>Sample TodoItem</h4>" }),
    // Mock other functions as necessary
  }),
}));

describe("TodoItem Component", () => {
  test("renders TodoItem", async () => {
    const { getByRole } = render(<TodoItem index={0} todoItemId="todoItem-1" parentId="todo-1" onDelete={jest.fn()} />);
    const todoContent = await waitFor(() => getByRole("heading", { level: 4, name: "Sample TodoItem" })); // Assuming "Sample Todo" is visible text content
    expect(todoContent).toBeInTheDocument();
  });
  test("handles delete function", async () => {
    const deleteFunc = jest.fn();
    const { getByRole } = render(<TodoItem index={0} todoItemId="todoItem-1" parentId="todo-1" onDelete={deleteFunc} />);
    const delBtn = getByRole("button", { name: "Delete" });
    await userEvent.click(delBtn);
    expect(deleteFunc).toHaveBeenCalled();
  });

  test("handles content change", async () => {
    const { getByLabelText, getByRole, getByText } = render(<TodoItem index={0} todoItemId="todoItem-1" parentId="todo-1" onDelete={jest.fn()} />);
    const dynamicText = await waitFor(() => getByLabelText("Text Area"));
    expect(dynamicText).toBeInTheDocument();

    // Toggle Edit button so we can contentEditible
    // Click the text area to check focus
    await userEvent.click(dynamicText);
    expect(dynamicText).toHaveFocus();

    await waitFor(() => userEvent.keyboard("{Enter}New Paragraph{Enter}"));
    const spanElement = getByText("New Paragraph");
    expect(spanElement.tagName).toBe("P");
    expect(spanElement).toHaveClass("first-el");
  });
});
