import React, { useEffect, useRef, useState } from "react";

// const content = "<div>One</div><div>Two</div><div><br/></div>";

interface DynamicTextProps {
  primaryElement?: string;
  secondaryElement?: string;
  className?: string;
  isEditable?: boolean;
  content?: string | TrustedHTML;
  onChange: (html: string) => void;
}

const DynamicText: React.FC<DynamicTextProps> = ({ primaryElement = "p", secondaryElement = "span", className, isEditable = true, onChange, content = "" }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    handleEmptyDiv();
    formatSpan();
    const innerHTML = contentEditableRef.current?.innerHTML;
    innerHTML && onChange(innerHTML);
  };

  useEffect(() => {
    formatElements();
    handleEmptyDiv();
  }, []);

  useEffect(() => {
    contentEditableRef.current?.focus();
  }, [isEditable]);

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

  // Dont let elements nest on enter, take care of empty new lines seperate first element and the rest
  const formatElements = () => {
    if (!contentEditableRef.current) return;
    const parentNode = contentEditableRef.current;
    
    contentEditableRef.current.childNodes.forEach((node, i) => {
      // Makes first element different than the rest
      if (i === 0) {
        const newNode = document.createElement(primaryElement);
        // newNode.style.fontSize = "25px";
        newNode.textContent = node.textContent;
        parentNode?.insertBefore(newNode, node);
        parentNode?.removeChild(node);
      }
      // If an element isnt empty then we are creating an element of "secondaryElement" add the text of the node
      // And replace the muttled element with new one
      else if (node.textContent !== "") {
        const newNode = document.createElement(secondaryElement);
        // newNode.style.fontSize = "18px";
        if (secondaryElement === "span") {
          newNode.style.display = "block";
        }
        if (i === 1) newNode.className = "first-el";
        newNode.textContent = node.textContent;
        // parentNode?.insertBefore(newNode, node);
        // parentNode?.removeChild(node);
        parentNode?.replaceChild(newNode, node);
      }
      // If element is empty add the empty add secondary El with <br/>
      else if (node.textContent === "") {
        const newNode = document.createElement(secondaryElement);
        newNode.appendChild(document.createElement("br"));
        if (i === 1) newNode.className = "first-el";
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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      formatElements();
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      formatSpan();
    }
  };

  return (
    <div
      aria-label="Text Area"
      className={className}
      ref={contentEditableRef}
      contentEditable={isEditable}
      onKeyUp={handleKeyUp}
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default DynamicText;
