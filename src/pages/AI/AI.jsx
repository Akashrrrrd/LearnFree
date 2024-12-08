import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AI.css";

const AI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = 0; // Scroll to top initially
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          text: "Welcome to VLSIGuru! How can I assist you today? Ask me about VLSI courses, learning resources, or any topics you'd like to explore in the world of VLSI design.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage = {
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
      setIsLoading(true);

      const conversationHistory = messages
        .map((message) => `${message.sender}: ${message.text}`)
        .join("\n");

      const requestBody = {
        contents: [
          { parts: [{ text: `${conversationHistory}\nuser: ${inputValue}` }] },
        ],
      };

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCiPoe0gRro_hB4r6JasjOrmU_4kOUAO7Q`,
          requestBody,
          { headers: { "Content-Type": "application/json" } }
        );

        const aiResponse = response.data.candidates[0].content.parts[0].text;

        if (aiResponse) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: aiResponse, sender: "ai", timestamp: new Date() },
          ]);
        } else {
          throw new Error("No valid response from AI");
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `Error: ${error.message}. Please try again.`,
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMessages = () => {
    let currentSender = null;
    let messageGroup = [];
    const groupedMessages = [];

    messages.forEach((message, index) => {
      if (message.sender !== currentSender) {
        if (messageGroup.length > 0) {
          groupedMessages.push(messageGroup);
        }
        messageGroup = [message];
        currentSender = message.sender;
      } else {
        messageGroup.push(message);
      }

      if (index === messages.length - 1) {
        groupedMessages.push(messageGroup);
      }
    });

    return groupedMessages.map((group, groupIndex) => (
      <div
        key={groupIndex}
        className={`message-group ${group[0].sender}-group`}
      >
        {group.map((message, messageIndex) => (
          <div
            key={messageIndex}
            className={`message ${message.sender}-message`}
          >
            <div className="message-content">{message.text}</div>
            <div className="message-timestamp">
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="ai-container">
      <header className="ai-header">
        <h1>VLSIGuru Assistant</h1>
        <p className="ai-intro">
          Discover the world of VLSI (Very Large Scale Integration) with
          VLSIGuru. Ask me anything about VLSI design, courses, semiconductor
          technology, or any other related topics!
        </p>
      </header>
      <div className="ai-chatbox" ref={chatboxRef}>
        {renderMessages()}
        {isLoading && (
          <div className="message ai-message loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      <div className="ai-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about VLSI design, courses, or related topics..."
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleSendMessage();
            }
          }}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="send-button-ai"
          disabled={isLoading}
        >
          <span className="button-text-ai">Send</span>
          <span className="button-icon-ai">📚</span>
        </button>
      </div>
    </div>
  );
};

export default AI;
