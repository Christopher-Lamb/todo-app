import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { TodoItem, PageHeaderControls, TodoContainer } from "../components";
import { DragDropContext } from "react-beautiful-dnd";
import initalData from "../misc/initalData.ts";
const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="2xl:max-w-four mt-one bg-blue-100 mx-auto grid justify-center">
      <PageHeaderControls title="Todo's" />
      <DragDropContext onDragEnd={() => {}}>
        <TodoContainer todoContainerId="index">
          
          <TodoItem todoItemId="1" index={0} />
          <TodoItem todoItemId="2" index={1} />
          <TodoItem todoItemId="3" index={2} />
          <TodoItem todoItemId="4" index={3} />
          <TodoItem todoItemId="5" index={4} />
        </TodoContainer>
      </DragDropContext>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
