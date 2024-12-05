import React, { useContext, useRef } from 'react';
import { TopicContext } from '../../context/TopicContext';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

const MinecraftSteve = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={ref}>
      {/* Head */}
      <mesh position={[0, 1.75, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f8b878" />
        <Edges color="black" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color="#3c93ff" />
        <Edges color="black" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.75, 0.75, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshStandardMaterial color="#3c93ff" />
        <Edges color="black" />
      </mesh>
      <mesh position={[0.75, 0.75, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshStandardMaterial color="#3c93ff" />
        <Edges color="black" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.25, -0.75, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshStandardMaterial color="#1d72b8" />
        <Edges color="black" />
      </mesh>
      <mesh position={[0.25, -0.75, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshStandardMaterial color="#1d72b8" />
        <Edges color="black" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.25, 2, 0.51]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.25, 2, 0.51]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Pupils */}
      <mesh position={[-0.25, 2, 0.52]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.25, 2, 0.52]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, 1.5, 0.51]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { topic, setTopic } = useContext(TopicContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/conversation');
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
          <MinecraftSteve />
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
