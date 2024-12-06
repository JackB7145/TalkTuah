import React, { useContext, useEffect, useState } from 'react';
import { TopicContext } from '../../context/TopicContext';
import Chat from "../../components/chat.jsx";
import { Navigate, useNavigate } from 'react-router-dom';

const Conversation = () => {
  const { topic } = useContext(TopicContext);
  const [conversation, setConversation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchTopic = async () => {
      try {
        const response = await fetch('http://localhost:8000/topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic }), 
        });

        if (isMounted) {
          const data = await response.json(); 
          console.log('Server response:', data);

          if (data.discussion) {
            setConversation(data.discussion); 
            console.log(conversation)
          }
          console.log(conversation)
        }
      } catch (error) {
        if (isMounted) {
          console.log('Error:', error);
        }
      }
    };

    fetchTopic();

    return () => {
      isMounted = false;
    };
  }, [topic]);  

  useEffect(() => {
    if (topic == ""){
      navigate('/')
    }
  }, [])

  return (
    <>
    <div className="w-full min-h-screen bg-yellow-100 flex flex-col justify-center items-center">
      <div className='flex flex-col justify-start items-center bg-yellow-700 border-[1rem] border-yellow-950 rounded-2xl min-h-[45rem] min-w-[35rem] overflow-y-auto'>
        <div className='flex items-center w-full bg-yellow-800 p-4'>
        <div className='w-[10%] flex justify-center text-amber-200 border-[0.2rem] border-amber-950 bg-amber-950 rounded-lg font-medium' onClick={() => {navigate('/')}}><button>Back</button></div>
            <div className='w-[80%] flex justify-center font-medium text-xl text-amber-950'>
              <div className="border-[0.25rem] bg-amber-900 border-yellow-950 rounded-xl p-1 text-amber-200">
                <p className='flex items-center'>Topic: <span className="ml-1 max-w-[13rem] overflow-x-auto overflow-y-hidden whitespace-nowrap custom-scrollbar">{topic}</span></p>
              </div>
            </div>
        </div>
        <div><p>This is where the messages will go</p></div>
      </div>
    </div>
    </>
  )
}

export default Conversation;
