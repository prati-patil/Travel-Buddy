import React, { useState, useEffect, useRef } from 'react';
import maleStatic from '../../assets/ai/Male-Static.png';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

const Chat = ({ chatData }) => {
    const [chat, setChat] = useState(chatData);
    const currChat = useSelector((state) => state.query.currChat);
    const chatEndRef = useRef(null);
    console.log(currChat)

    useEffect(() => {
        scrollToBottom();
    }, [currChat]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    };

    return (
        <div className='chat-container w-full h-full overflow-y-auto flex flex-col items-start gap-2 px-4'>
            {currChat?.map((chat) => (
                <div key={chat.id} className={`flex relative items-center gap-4 max-w-[70%] w-auto border p-4 rounded-xl ${chat.name === 'User' ? "bg-indigo-200 self-end" : "bg-purple-200"}`}>
                    <img src={chat.name === 'User' ? 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' : maleStatic} alt="" className='w-12 h-12 object-cover rounded-full border self-start' />
                    <div>
                        <span className={`font-bold ${chat.name === 'User' ? "text-indigo-900" : "text-purple-900"}`}>{chat.name}</span>
                        {/* <p>{chat.message}</p> */}
                        {/* dangerously set innerhtml */}
                        <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
                    </div>
                    {chat.picture?.is_attached && (
                            <div className='!w-[90%] absolute left-0 bottom-[-15px]'>
                                <Tooltip title={chat.picture.pic_name} arrow>
                                    <IconButton
                                    sx={{
                                        // right: '80%',
                                    }} 
                                    className=''>
                                        <AttachFileIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
};

export default Chat;
