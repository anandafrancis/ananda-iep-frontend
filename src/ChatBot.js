// Create a new component named ChatBot.js
import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to the ChatBot!' },
  ]);

  const handleUserMessage = (userMessage) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: userMessage },
    ]);

    // Simulate a response from the chatbot
    // In a real-world scenario, you would make an API call to your backend
    simulateChatBotResponse(userMessage);
  };

  const simulateChatBotResponse = async (userMessage) => {
    // Simulate API call or any processing logic
    try {
      const response = await fetch('http://localhost:7000/simulate-chat-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'bot', content: result.message },
        ]);
      } else {
        console.error('Error fetching chatbot response');
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  };

  return (
    <div className="chat-bot">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          {message.content}
        </div>
      ))}
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUserMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatBot;
