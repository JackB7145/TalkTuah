import React, { useContext, useRef } from 'react';
import { TopicContext } from '../../context/TopicContext';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useEffect } from 'react';


// const MinecraftSteve = () => {
//   const ref = useRef();
//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.01;
//       ref.current.rotation.z += 0.01;
//       ref.current.rotation.x += 0.01;
//     }
//   });

//   return (
//     <group ref={ref}>
//       {/* Head */}
//       <mesh position={[0,0,2]}>
//         <sphereGeometry args={[0.5]}/>
//         <meshStandardMaterial color="brown" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[2,0,0]}>
//         <sphereGeometry args={[0.5]}/>
//         <meshStandardMaterial color="brown" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[-2,0,0]}>
//         <sphereGeometry args={[0.5]}/>
//         <meshStandardMaterial color="brown" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[1,0,-2]}>
//         <sphereGeometry args={[0.5]}/>
//         <meshStandardMaterial color="brown" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[0,2.7,0]}>
//         <boxGeometry args={[1,0.7,1]}/>
//         <meshStandardMaterial color="brown" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[0,2.3,0]}>
//         <boxGeometry args={[1.25, 0.1, 1.25]}/>
//         <meshStandardMaterial color="red" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[0, 1.75, 0]}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color="#f8b878" />
//         <Edges color="black" />
//       </mesh>
//       {/* Body */}
//       <mesh position={[0, 0.75, 0]}>
//         <boxGeometry args={[1, 1.5, 0.5]} />
//         <meshStandardMaterial color="#3c93ff" />
//         <Edges color="black" />
//       </mesh>
//       {/* Arms */}
//       <mesh position={[-0.75, 0.75, 0]}>
//         <boxGeometry args={[0.5, 1.5, 0.5]} />
//         <meshStandardMaterial color="#3c93ff" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[0.75, 0.75, 0]}>
//         <boxGeometry args={[0.5, 1.5, 0.5]} />
//         <meshStandardMaterial color="#3c93ff" />
//         <Edges color="black" />
//       </mesh>
//       {/* Legs */}
//       <mesh position={[-0.25, -0.75, 0]}>
//         <boxGeometry args={[0.5, 1.5, 0.5]} />
//         <meshStandardMaterial color="#1d72b8" />
//         <Edges color="black" />
//       </mesh>
//       <mesh position={[0.25, -0.75, 0]}>
//         <boxGeometry args={[0.5, 1.5, 0.5]} />
//         <meshStandardMaterial color="#1d72b8" />
//         <Edges color="black" />
//       </mesh>
//       {/* Eyes */}
//       <mesh position={[-0.25, 2, 0.51]}>
//         <boxGeometry args={[0.2, 0.2, 0.1]} />
//         <meshStandardMaterial color="white" />
//       </mesh>
//       <mesh position={[0.25, 2, 0.51]}>
//         <boxGeometry args={[0.2, 0.2, 0.1]} />
//         <meshStandardMaterial color="white" />
//       </mesh>
//       {/* Pupils */}
//       <mesh position={[-0.25, 2, 0.52]}>
//         <boxGeometry args={[0.1, 0.1, 0.1]} />
//         <meshStandardMaterial color="black" />
//       </mesh>
//       <mesh position={[0.25, 2, 0.52]}>
//         <boxGeometry args={[0.1, 0.1, 0.1]} />
//         <meshStandardMaterial color="black" />
//       </mesh>
//       {/* Mouth */}
//       <mesh position={[0, 1.5, 0.51]}>
//         <boxGeometry args={[0.4, 0.1, 0.1]} />
//         <meshStandardMaterial color="black" />
//       </mesh>
//     </group>
//   );
// };

const Home = () => {
  const navigate = useNavigate();
  const { topic, setTopic } = useContext(TopicContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/conversation');
  };

  useEffect(() => {
    setTopic("")
  },[])

  return (
    <div className="w-full min-h-screen bg-yellow-100 flex flex-col justify-center items-center">
      <div className='flex flex-col justify-end items-center bg-yellow-700 border-[1rem] border-yellow-950 rounded-2xl min-h-[45rem] min-w-[35rem]'>
        <div className='flex flex-col w-full justify-center items-center bg-yellow-800 p-4'>
          <form onSubmit={handleSubmit}>
            <input className='w-auto border-[0.25rem] bg-amber-900 border-yellow-950 rounded-lg mr-2 pl-2 font-medium text-amber-200 placeholder-amber-200'
              required
              type="text"
              placeholder='Topic Here'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onBlur={() => {}}
            />
            <button type="submit" className="text-amber-200 border-[0.2rem] border-amber-950 bg-amber-950 pl-2 pr-2 rounded-lg font-medium">Submit</button>
          </form>
        </div>
      </div>
      {/* <div style={{ width: '100%', height: '400px', marginTop: '20px' }}> */}
        {/* <Canvas style={{backgroundColor: "black"}}>
          <ambientLight intensity={1}/>
          <pointLight position={[0, 0, 3]} />
          <MinecraftSteve />
        </Canvas> */}
      {/* </div> */}
    </div>
  );
};

export default Home;
