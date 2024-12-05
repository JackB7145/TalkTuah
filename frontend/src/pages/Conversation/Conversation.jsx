import React, { useContext, useEffect, useState } from 'react';
import { TopicContext } from '../../context/TopicContext';
import Chat from "../../components/chat.jsx";

const Conversation = () => {
  const { topic } = useContext(TopicContext);
  const [conversation, setConversation] = useState([]);

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

  return (
    <div>Current Topic: {topic}</div>
  )
}

export default Conversation;
