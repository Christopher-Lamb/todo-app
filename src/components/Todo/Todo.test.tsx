import React from "react";
import { render, waitFor } from "@testing-library/react";
import Todo from "./Todo";
import userEvent from "@testing-library/user-event";

// Assuming useIndexedDB is the only export from the file
jest.mock("../../context/IndexedDBContext", () => ({
  useIndexedDB: () => ({
    getTodo: jest.fn().mockResolvedValue({ id: "todo-1", content: "<h3>Sample Todo</h3>" }),
    // Mock other functions as necessary
  }),
}));

describe("Todo Component", () => {
  test("renders todo", async () => {
    const { getByRole } = render(<Todo index={0} todoId="todo-1" onDelete={jest.fn()} />);
    const todoContent = await waitFor(() => getByRole("heading", { level: 3, name: "Sample Todo" })); // Assuming "Sample Todo" is visible text content
    expect(todoContent).toBeInTheDocument();
  });
  test("handles delete function", async () => {
    const deleteFunc = jest.fn();
    const { getByRole } = render(<Todo index={0} todoId="todo-1" onDelete={deleteFunc} />);
    const delBtn = getByRole("button", { name: "Delete" });
    await userEvent.click(delBtn);
    expect(deleteFunc).toHaveBeenCalled();
  });

  test("handles content change", async () => {
    const { getByLabelText, getByRole, getByText } = render(<Todo index={0} todoId="todo-1" onDelete={jest.fn()} />);
    const dynamicText = await waitFor(() => getByLabelText("Text Area"));
    const editButton = await waitFor(() => getByLabelText("Edit Toggle"));
    expect(dynamicText).toBeInTheDocument();

    // Toggle Edit button so we can contentEditible
    await userEvent.click(editButton);
    // Click the text area to check focus
    await userEvent.click(dynamicText);
    expect(dynamicText).toHaveFocus();

    await waitFor(() => userEvent.keyboard("{Enter}New Span{Enter}"));
    const spanElement = getByText("New Span");
    expect(spanElement.tagName).toBe("SPAN");
    expect(spanElement).toHaveClass("first-el");
  });
});
