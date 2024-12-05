import React, { useContext, useRef } from 'react';

const Chat = ({message, bot}) => {

    return(
        <div className='w-[100%] flex justify-center items-center'>
            <div className='w-[80%]'>
                <h3 className='m-5'>Bot Name: {bot}</h3>
                <p>{message}</p>
            </div>
        </div>
    );
}
export default Chat;