import React from "react";
import { render, waitFor } from "@testing-library/react";
import Todo from "./Todo";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation((message) => {
    if (message.includes("Warning: A component is `contentEditable`")) {
      return null;
    }
    return console.error(message);
  });
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("Todo Component", () => {
  test("renders", () => {
    const { getByRole } = render(<Todo todoId={"todo-1"} index={1} onDelete={jest.fn()} />);
    const todoHeading = getByRole("heading", { level: 3 });
    expect(todoHeading).toHaveTextContent("To Do 1");
  });

  test("deletes itself", async () => {
    const deleteFunc = jest.fn();
    const { getByRole } = render(<Todo todoId={"todo-1"} index={1} onDelete={deleteFunc} />);
    const deleteBtn = getByRole("button", { name: "Delete" });
    userEvent.click(deleteBtn);
    expect(deleteBtn).toBeInTheDocument();
    await waitFor(() => {
      expect(deleteFunc).toHaveBeenCalled();
    });
  });

  test("allows user to edit Todo", async () => {
    const { getByRole } = render(<Todo todoId={"todo-1"} index={1} onDelete={jest.fn()} />);
    const editBtn = getByRole("button", { name: "Edit Toggle" });
    userEvent.click(editBtn);
    const todoHeading = getByRole("heading", { level: 3 });
    todoHeading.focus();
    userEvent.type(todoHeading, " test");
    await waitFor(() => {
      expect(todoHeading).toHaveTextContent("To Do 1 test");
    });
  });
});
