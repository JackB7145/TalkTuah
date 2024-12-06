import React, { useState, useEffect, useContext } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { TopicContext } from '../../context/TopicContext';
import Chat from '../../components/chat.jsx';
import { useNavigate } from 'react-router-dom';

const makeCall = async (topic, setConversation, setLoading) => {
  try {
    console.log("Making API call"); // Log when the API call is made
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
  } finally {
    setLoading(false); // Stop loading when API call completes
  }
};

const Conversation = () => {
  const { topic, setTopic } = useContext(TopicContext);
  const [conversation, setConversation] = useState([]); // To store API response
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!topic) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    console.log("useEffect triggered, current topic:", topic); // Log current topic

    if (topic) {
      makeCall(topic, setConversation, setLoading);
    }
  }, [topic]);

  useEffect(() => {
    console.log("Conversation state:", conversation); // Log conversation state
  }, [conversation]);

  return (
    <div className="w-full min-h-screen bg-yellow-100 flex flex-col justify-center items-center">
      {loading ? (
        // Display loading screen while data is being fetched
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="loader bg-yellow-800 w-16 h-16 rounded-full border-4 border-t-yellow-300 animate-spin"></div>
            <p className="mt-4 text-yellow-900 font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        // Render the main conversation UI once data is loaded
        <div className="flex flex-col justify-start items-center bg-yellow-700 border-[1rem] border-yellow-950 rounded-2xl min-h-[45rem] max-h-[45rem] min-w-[35rem] max-w-[35rem] overflow-y-auto shadow-2xl">
          <div className="flex items-center w-full bg-yellow-800 p-4">
            <div
              className="w-[10%] flex justify-center text-amber-200 border-[0.2rem] border-amber-950 bg-amber-950 rounded-lg font-medium"
              onClick={() => {
                navigate('/');
              }}
            >
              <button>Back</button>
            </div>
            <div className="w-[80%] flex justify-center font-medium text-xl text-amber-950">
              <div className="border-[0.25rem] bg-amber-900 border-yellow-950 rounded-xl p-1 text-amber-200">
                <p className="flex items-center">
                  Topic:{' '}
                  <span className="ml-1 max-w-[13rem] overflow-x-auto overflow-y-hidden whitespace-nowrap custom-scrollbar">
                    {topic}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto custom-scrollbar p-2">
            <ul>
              {conversation.map((message, index) => (
                <Chat
                  key={index}
                  message={message.topic} // Map 'name' from the conversation to 'message' prop
                  bot={message.name} // Map 'topic' from the conversation to 'bot' prop
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
