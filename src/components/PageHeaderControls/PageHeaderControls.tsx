import React from "react";

interface PageHeaderControlsProps {
  title: string;
}

const PageHeaderControls: React.FC<PageHeaderControlsProps> = ({ title = "title" }) => {
  return (
    <div>
      <h1 className="text-large archivo">{title}</h1>
    </div>
  );
};

export default PageHeaderControls;
