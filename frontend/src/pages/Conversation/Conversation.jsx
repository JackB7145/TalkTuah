import React, { useState, useEffect, useContext } from 'react';
import { TopicContext } from '../../context/TopicContext';
import Chat from '../../components/chat.jsx';

const makeCall = async (topic, setConversation) => {
  try {
    console.log("Making API call");  // Log when the API call is made
    const response = await fetch('http://localhost:8000/topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    if (data.discussion) {
      setConversation(data.discussion); // Update conversation state
    }
  } catch (error) {
    console.error("Error making API call:", error);
  }
};

const Conversation = () => {
  const { topic, setTopic } = useContext(TopicContext);
  const [conversation, setConversation] = useState([]); // To store API response

  useEffect(() => {
    console.log("useEffect triggered, current topic:", topic);  // Log current topic

    if (topic) {
      makeCall(topic, setConversation);
    }
  }, [topic]);

  useEffect(() => {
    console.log("Conversation state:", conversation);  // Log conversation state
  }, [conversation]);

  return (
    <div>
      <h1>Discussion on: {topic}</h1>
      <ul>
        {conversation.map((message, index) => (
          <Chat
            key={index}
            message={message.topic}  // Map 'name' from the conversation to 'message' prop
            bot={message.name}     // Map 'topic' from the conversation to 'bot' prop
          />
        ))}
      </ul>
    </div>
  );
};

export default Conversation;
