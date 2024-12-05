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
    <div>
      <h1>Current Topic: {topic}</h1>
      <div>
        {conversation.map((element, index) => (
          <Chat key={index} message={element.topic} bot={element.name} />
        ))}
      </div>
    </div>
  );
};

export default Conversation;
