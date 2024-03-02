import React, { useEffect, useRef, useState } from "react";

// const content = "<div>One</div><div>Two</div><div><br/></div>";

interface DynamicTextProps {
  primaryElement?: string;
  secondaryElement?: string;
  className?: string;
  isEditable?: boolean;
  onChange: (html: string) => void;
}

const DynamicText: React.FC<DynamicTextProps> = ({ primaryElement = "p", secondaryElement = "span", className, isEditable = true, onChange }) => {
  const [content, setContent] = useState("");
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    handleEmptyDiv();
    const innerHTML = contentEditableRef.current?.innerHTML;
    console.log(innerHTML);
    innerHTML && onChange(innerHTML);
  };

  useEffect(() => {
    formatElements();
    handleEmptyDiv();
  }, []);

  const handleEmptyDiv = () => {
    const parentNode = contentEditableRef.current;
    const childNodes = parentNode?.childNodes;
    if (parentNode?.textContent === "" && childNodes?.length === 0) {
      const newNode = document.createElement(primaryElement);
      newNode.appendChild(document.createElement("br"));
      // newNode.style.fontSize = "25px";
      parentNode.appendChild(newNode);
    }
  };

  const formatElements = () => {
    if (!contentEditableRef.current) return;
    const parentNode = contentEditableRef.current;
    const childNodes = contentEditableRef.current.childNodes.forEach((node, i) => {
      if (i === 0) {
        const newNode = document.createElement(primaryElement);
        // newNode.style.fontSize = "25px";
        newNode.textContent = node.textContent;
        parentNode?.insertBefore(newNode, node);
        parentNode?.removeChild(node);
      } else if (node.textContent !== "") {
        const newNode = document.createElement(secondaryElement);
        // newNode.style.fontSize = "18px";
        if (secondaryElement === "span") {
          newNode.style.display = "block";
        }
        newNode.textContent = node.textContent;
        // parentNode?.insertBefore(newNode, node);
        // parentNode?.removeChild(node);
        parentNode?.replaceChild(newNode, node);
      } else if (node.textContent === "") {
        const newNode = document.createElement(secondaryElement);
        newNode.appendChild(document.createElement("br"));
        // newNode.style.fontSize = "18px";
        if (secondaryElement === "span") {
          newNode.style.display = "block";
        }
        // parentNode?.insertBefore(newNode, node);
        // parentNode?.removeChild(node);
        parentNode?.replaceChild(newNode, node);
      }
    });
  };

  const formatSpan = () => {
    if (!contentEditableRef.current) return;
    const range = document.createRange();
    const parentNode = contentEditableRef.current;
    const childNodes = contentEditableRef.current.childNodes.forEach((node, i) => {
      node.childNodes.forEach((childChildNode) => {
        const nodeName = childChildNode.nodeName;
        // console.log(nodeName);
        if (nodeName === "SPAN") {
          // console.log({ parentNode: node, spanNode: childChildNode, firstChild: node.firstChild, firstLength: node.firstChild?.textContent?.length });
          const length = node.firstChild?.textContent?.length;
          (node.textContent = node.textContent), childChildNode.textContent;
          if (node.firstChild && length) {
            range.setStart(node.firstChild, length);
            range.setEnd(node.firstChild, length);
            const selection = window.getSelection();
            if (!selection) return;
            // Get the current selection and remove any existing ranges
            selection.removeAllRanges();
            // Add the new range to the selection
            selection.addRange(range);
          }
        }
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      formatElements();
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      formatSpan();
    }
  };

  return <div className="p-4" ref={contentEditableRef} contentEditable={isEditable} onKeyUp={handleKeyDown} onInput={handleChange} dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default DynamicText;
