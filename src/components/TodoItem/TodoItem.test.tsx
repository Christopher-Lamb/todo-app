import React from "react";
import { render, waitFor } from "@testing-library/react";
import TodoItem from "./TodoItem";
import userEvent from "@testing-library/user-event";

describe("TodoItem Component", () => {
  //Later will need to mock the indexedDB make an entry probably on default based off of inial data of some sort
  test("renders inital text", () => {
    const { getByLabelText } = render(<TodoItem todoItemId="todoItem-1" index={0} onDelete={jest.fn()} />);
    const textContent = getByLabelText("Text content");
    expect(textContent).toHaveTextContent("To do Item 1");
  });

  test("delete button fires", async () => {
    const deleteFunc = jest.fn();
    const { getByRole } = render(<TodoItem todoItemId="todoItem-1" index={0} onDelete={deleteFunc} />);
    const deleteBtn = getByRole("button", { name: "Delete" });
    userEvent.click(deleteBtn);
    expect(deleteBtn).toBeInTheDocument();
    await waitFor(() => {
      expect(deleteFunc).toHaveBeenCalled();
    });
  });

  test("dynamically handle Enter keydown in contentEditable", async () => {
    const { getByLabelText } = render(<TodoItem todoItemId="todoItem-1" index={0} onDelete={jest.fn()} />);
    const editableDiv = getByLabelText("Text content");
    expect(editableDiv).toHaveTextContent("To do Item 1");
    
    editableDiv.focus()

    userEvent.type(editableDiv, "{enter}");
    
    await waitFor(() => {
      expect(editableDiv).toContainHTML("<p><br></p>");
    });
  });
});
