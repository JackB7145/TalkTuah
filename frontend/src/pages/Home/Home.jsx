import React, { useState } from 'react';

const Home = () => {
  const [topic, setTopic] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch('http://localhost:8000/topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });
      
      const data = await response.json(); // Parse the response
      console.log('Server response:', data["message"]);
    } catch (e) {
      console.log('Error:', e);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}> {/* Wrap the input in a form */}
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)} // Update state on input change
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
