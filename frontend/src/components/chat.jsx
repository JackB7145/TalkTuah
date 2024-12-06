import React, { useContext, useRef } from 'react';

const Chat = ({message, bot}) => {

    return(
        <>
        {bot == "Bot 1"?
        <div className='w-[100%] flex justify-end'>
            <div className='p-3 w-[45%] flex flex-col justify-end bg-amber-800 rounded-lg shadow-lg'>
                <h3 className='font-bold'>{bot}</h3>
                <p>{message}</p>
            </div>
        </div>
        :
        <div className='w-[100%] flex justify-start'>
            <div className='p-3 w-[45%] flex flex-col justify-end bg-amber-600 rounded-lg shadow-lg'>
                <h3 className='font-bold'>{bot}</h3>
                <p>{message}</p>
            </div>
        </div>
        }
        </>
    );
}
export default Chat;