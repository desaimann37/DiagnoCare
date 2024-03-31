import React, { useState } from 'react';
import './chatbot.css'; // Import the CSS file for styling
import axios from 'axios'; // Import axios for making HTTP requests

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user's message to the chat history
    const newUserMessage = { sender: 'user', text: input };
    setMessages(messages=>([...messages, newUserMessage]));
    
    setInput('');

    try {
      // Make HTTP POST request to the Flask backend
      const response = await axios.post('https://ishapaghdal-DiagnoCare.hf.space/chat/chat', { question: input });
      const botResponse = { sender: 'bot', text: response.data.response };

      // Add bot's response to the chat history
      setMessages(messages=>([...messages, botResponse]));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="input-field"
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
