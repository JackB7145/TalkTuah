import React, { useContext } from 'react';
import { TopicContext } from '../../context/TopicContext';
import {useNavigate} from 'react-router-dom';
import './Conversation.css';

const Conversation = () => {
  const { topic } = useContext(TopicContext);
  const navigate = useNavigate();
  function goHome(){
    navigate('/');
  }
  return (
    topic ? (
      <>
        <div>{topic}</div>
      </>
    ) : (
      <div>Error, please return to home <div className = "link" onClick={() => goHome()}>here</div></div>
    )
    
  )
}

export default Conversation