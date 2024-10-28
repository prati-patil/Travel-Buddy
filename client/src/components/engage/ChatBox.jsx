import React, { useEffect, useState, useRef } from 'react';
import { TextField, IconButton, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { chatData } from '../../data/chatData';
import { useSelector, useDispatch } from 'react-redux';
import { setEndVid, setResLoading } from '../../redux/features/aiCard';
import { setCurrChat } from '../../redux/features/querySlice';
import Chat from './Chat';
import { useSpeechSynthesis } from 'react-speech-kit';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Api from '../../api';
import DotLoader from './DotLoader';
import axios from 'axios';

const ChatBox = ({ customMsg }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(customMsg || '');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const currChat = useSelector((state) => state.query.currChat);
    const [chatData, setChatData] = useState(currChat);
    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(true);
    const { startLocationInfo, destinationInfo } = useSelector((state) => state.query);
    const user = JSON.parse(localStorage.getItem('user'));
    const { audio, video, endVid, resLoading } = useSelector((state) => state.aiCard);
    const { speak, cancel, voices } = useSpeechSynthesis({
        onEnd: () => {
            console.log("End");
            dispatch(setEndVid(false));
        },
    });

    useEffect(() => {
        setLoading(true);
        console.log(currChat)
        setChatData(currChat);
        setLoading(false);
    }, [currChat]);

    useEffect(() => {
        setLoading(true);
        const fetchChatData = async () => {
            await Api.getAllChats({ email: user.email })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.message === 'success') {
                        const lastIdx = res.data.chat.length - 1;
                        dispatch(setCurrChat(res.data.chat[lastIdx]?.chatInfo));
                        setChatData(res.data.chat[lastIdx]?.chatInfo);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchChatData();
    }, [change]);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    useEffect(() => {
        window.speechSynthesis.cancel();
    }, []);

    const sendMessage = async () => {
        if (message.trim() === '') {
            toast.error('Message cannot be empty');
            return;
        }
        let chat = currChat;
        console.log(currChat)
        if (!chat) {
            chat = [];
        }
        console.log(chat)
        // chat.push({ sender: 'user', message: message });
        const newChat = {
            name: 'User',
            message: message,
            picture: {
                is_attached: image ? true : false,
                pic_path: image ? image.path : null,
                pic_name: image ? image.originalname : null,
                pic_type: image ? image.mimetype : null,
            }
        }
        chat = [...chat, newChat];
        dispatch(setCurrChat(chat));
        setChatData(chat);
        const formData = new FormData();
        formData.append('email', user.email);
        const msg = message;
        if (image) {
            formData.append('image', image);
            setMessage('');
            setImage(null);
            dispatch(setResLoading(true));
            await axios.post('http://127.0.0.1:5000/classify-image', formData)
            .then((res) => {
                console.log(res.data)
                // {
                //     "ai_country": "India",
                //     "ai_lat": 27.172452926635742,
                //     "ai_lon": 78.04191589355469,
                //     "camera_maker": "SONY",
                //     "camera_model": "DSC-R1",
                //     "city": "Agra",
                //     "province": "Uttar Pradesh",
                //     "timestamp": "2010:08:14 06:26:51"
                //   }
                const msgAddon = `#NOTE: Do not Mention that you have not seen the image act like you have, here is info about it: The image was taken in ${res.data.ai_country}, ${res.data.province}, ${res.data.city}`;
                formData.append('query', msg + " " + msgAddon);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else {
            formData.append('query', msg);
            formData.append('image', null)
            setMessage('');
            setImage(null);
        }
        formData.append('start', startLocationInfo?.formatted_address);
        formData.append('end', destinationInfo?.formatted_address);
        setMessage('');
        setImage(null);
        dispatch(setResLoading(true));
        // await Api.testChat(formData)
            // { email: user.email, query: message, start: startLocationInfo?.formatted_address, end: destinationInfo?.formatted_address })
        await axios.post('http://127.0.0.1:5000/chat', formData)
            .then(async (res) => {
                console.log(res.data)
                await timeout(10000);
                console.log(audio, video)
                dispatch(setResLoading(false));
                if (!audio && video) {
                    speak({ text: res.data.text, voice: voices[0], rate: 1 });
                    console.log('speaking')
                    dispatch(setEndVid(true));
                }
                if (res.data.message === 'success') {
                    setChange(!change);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleAttachFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 5000000) {
            toast.error('File size should be less than 5MB');
            return;
        }
        if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
            toast.error('Only .png, .jpg and .jpeg files are allowed');
            return;
        }
        if (file) {
            setImage(file);
        }
    }

    return (
        <div className='bg-white relative w-full h-full shadow-2xl shadow-slate rounded-xl p-4 flex flex-col'>
            {loading ?
                (<div className='w-full h-full flex items-center justify-center'>
                    <CircularProgress />
                </div>)
                : (<>
                    <div className='w-full h-[88%]'>
                        <Chat chatData={currChat} />
                    </div>
                    {(!currChat || currChat?.length === 0) && (<div
                        style={{
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        className='absolute w-full text-center text-7xl font-bold opacity-15'>
                        ANY TRAVEL PLANS?
                    </div>)}
                    <div className='bg-white w-full flex items-center gap-2 justify-evenly p-2 relative '>
                        {image && (
                            <div className='w-20 h-20 flex items-center justify-center bg-gray-200 rounded-xl absolute top-[-80px] left-8 border-black border-2'>
                                <div className='w-full h-full relative'>
                                    <IconButton
                                    className='!absolute !top-[-20px] !right-[-25px] shadow-2xl' 
                                    onClick={() => setImage(null)}>
                                        <CancelIcon />
                                    </IconButton>
                                <img src={URL.createObjectURL(image)} alt='img' className='w-full h-full object-cover rounded-xl' />
                                </div>
                            </div>
                        )}
                        <div className='absolute top-[-20px] left-12'>
                            {resLoading && <DotLoader />}
                        </div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Type your Query"
                            multiline
                            maxRows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            variant="outlined"
                            className='w-full h-full'
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '100px',
                                },
                            }}
                        />
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                        <span>
                            <Tooltip onClick={handleAttachFileClick} title='Upload Image' arrow>
                                <IconButton>
                                    <UploadFileIcon sx={{ fontSize: '2rem', color: '#662d91' }} />
                                </IconButton>
                            </Tooltip>
                        </span>
                        <span>
                            <Tooltip title='Send' arrow>
                                <IconButton onClick={sendMessage}>
                                    <SendIcon sx={{ fontSize: '2rem', color: '#662d91' }} />
                                </IconButton>
                            </Tooltip>
                        </span>
                    </div>
                </>)}
        </div>
    );
};

export default ChatBox;