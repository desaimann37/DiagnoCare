import React from "react";
import { useState } from "react";
import "./chatwidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <div className="chat-header" onClick={toggleChat}>
        Chat
      </div>
      {isOpen && (
        <div className="chat-body">
          {/* Your chat content goes here */}
          <div className="chat-message">Hello, how can we help you?</div>
          {/* Add more chat messages or input fields */}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
