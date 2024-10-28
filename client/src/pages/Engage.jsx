import React, { useState, useEffect } from 'react';
import AiBox from '../components/engage/AiBox';
import ChatBox from '../components/engage/ChatBox';
import Center from '../animated-components/Center';
import { CircularProgress } from '@mui/material';
import Api from '../api';

const Engage = () => {
    const [customMsg, setCustomMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);
    const [allChats, setAllChats] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setLoading(true);
        const fetchChatData = async () => {
            await Api.getAllChats({ email: user.email })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.message === 'success') {
                        setAllChats(res.data.chat);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchChatData();
    }, [change]);

    return (
        <Center>
        <div className='w-full h-[90vh] flex items-center justify-center gap-4 p-4'>
           {loading ?
            (<div className='w-full h-full flex items-center justify-center'>
                <CircularProgress />
            </div>) 
           : (<>
            <div className='h-full md:w-1/5 w-[40%] flex items-center justify-center'>
                <AiBox setCustomMsg={setCustomMsg} allChats={allChats}/>
            </div>
            <div className='h-full md:w-3/4 w-[60%]'>
                <ChatBox customMsg={customMsg} />
            </div>
            </>)}
        </div>
        </Center>
    );
};

export default Engage;