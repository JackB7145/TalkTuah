import React, { useContext } from 'react';
import { TopicContext } from '../../context/TopicContext';

const Conversation = () => {
  const { topic } = useContext(TopicContext);
  return (
    <div>Current Topic: {topic}</div>
  )
}

export default Conversation