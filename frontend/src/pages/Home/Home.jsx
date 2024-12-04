import React, { useContext } from 'react';
import { TopicContext } from '../../context/TopicContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { topic, setTopic } = useContext(TopicContext); 

  const handleSubmit = async (e) => {
    navigate('/conversation');
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      console.log('Server response:', data.message);
    } catch (e) {
      console.log('Error:', e);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
