import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/chat', { question: input });
        setResponse(res.data.response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="App">
        <h1>Disease Diagnosis Chatbot</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit">Ask</button>
        </form>
        {response && <p>{response}</p>}
      </div>
    );
}

export default Chatbot