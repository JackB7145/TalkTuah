import React, { useContext, useEffect, useRef } from 'react';
import { TopicContext } from '../../context/TopicContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

const SpinningCube = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
      <Edges color="black" /> 
    </mesh>
  );
};

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
      <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
        <Canvas>
          <ambientLight intensity={1} />
          <pointLight position={[0, 0, 0]} />
          <SpinningCube />
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
