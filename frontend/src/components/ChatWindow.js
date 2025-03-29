import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage } from "../api/api";
import robotIcon from "../assets/robot.png";
import { marked } from "marked";
marked.setOptions({ gfm: true });

function ChatWindow() {

  const defaultMessage = [{
    role: "assistant",
    content: "Hello, I'm the customer service bot for PartSelect! How can I help you?"
  }];

  const [messages,setMessages] = useState(defaultMessage)
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  const handleSend = async (input) => {
    if (input.trim() !== "") {
      // Set user message
      setMessages(prevMessages => [...prevMessages, { role: "user", content: input }]);
      setInput("");

      // Add an interim assistant message
      const loadingMessage = { role: "assistant", content: "Just a moment please..." };
      setMessages(prevMessages => [...prevMessages, loadingMessage]);

      // Call API & set assistant message
      const newMessage = await getAIMessage(input);
      console.log("Received message:", newMessage);
      
      // Remove the interim message and add the actual assistant response
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        // Remove the last message (our interim loading message)
        updatedMessages.pop();
        // Append the actual API response
        return [...updatedMessages, newMessage];
      });
    }
  };

  return (
      <div className="messages-container">
          {messages.map((message, index) => {
            const formattedContent = message.content.replace(/\\boxed\{([\s\S]*)\}$/m, "$1");
            return (
              <div key={index} className={`${message.role}-message-container`}>
                {/* If this is an assistant message, display the robot icon */}
                {message.role === "assistant" && (
                  <img src={robotIcon} alt="Assistant Robot" className="assistant-icon" />
                )}
                {message.content && (
                  <div className={`message ${message.role}-message`}>
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(formattedContent) }}></div>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSend(input);
                  e.preventDefault();
                }
              }}
              rows="3"
            />
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
      </div>
);
}

export default ChatWindow;