import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';
import { toast } from 'react-toastify';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import maleStatic from '../../assets/ai/Male-Static.png'
import femaleStatic from '../../assets/ai/Female-Static.png'
import maleSpeak from '../../assets/ai/Male.gif'
import femaleSpeak from '../../assets/ai/Female.gif'
import { Spin as Hamburger } from 'hamburger-react'
import Drawer from "@mui/material/Drawer";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Api from '../../api';
import { setCurrChat } from '../../redux/features/querySlice';

const AiCard = ({ allChats }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [data, setData] = useState();
    const { audio, video, endVid } = useSelector((state) => state.aiCard);
    const user = JSON.parse(localStorage.getItem('user'));

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const createNewChat = async () => {
        await Api.createChat({ email: user.email })
            .then((res) => {
                console.log(res.data)
                if (res.data.message === "success") {
                    // dispatch(setCurrProd(res.data.chat));
                    dispatch(setCurrChat(res.data.chat?.chatInfo ? res.data.chat.chatInfo : []));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const list = (data) => (
        <Box
            sx={{ width: 350, marginTop: 8, position: "relative" }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className="absolute top-[-50px] right-4">
                <IconButton>
                    <Hamburger
                        size={30}
                        color="black"
                        toggled={state}
                        toggle={setState}
                    />
                </IconButton>
            </div>
            <div className="mt-2 text-2xl font-bold w-full text-center mb-2">
                Previous Chats
            </div>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            createNewChat();  
                        }}
                    >
                        <ListItemIcon>{<AddIcon />}</ListItemIcon>
                        <ListItemText primary={"New Chat"} />
                    </ListItemButton>
                </ListItem>
                {allChats?.reverse().map((chat, index) => {
                    if (chat.chatInfo.length === 0) {
                        return;
                    }
                    return (
                        <ListItem key={chat._id} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                // dispatch(setCurrProd(chat));
                                dispatch(setCurrChat(chat.chatInfo));
                            }}
                        >
                            <ListItemText primary={chat.chatName}  />
                        </ListItemButton>
                    </ListItem>
                    )
                })}
            </List>
        </Box>
    );

    useEffect(() => {
        console.log(endVid)
    }
    , [endVid])

    return (
        <div className='h-1/2 w-full bg-white shadow-slate shadow-md rounded-xl relative'>
            <span className='absolute top-4 right-4'>
                <Hamburger
                    size={30}
                    color="#662d91"
                    toggled={state}
                    toggle={setState}
                />
            </span>
            <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
              {list(data)}
            </Drawer>
            {!video ? (
                <div className='w-full h-full flex items-center justify-center gap-4'>
                    <NoAccountsRoundedIcon sx={{ fontSize: 225 }} />
                </div>
            ) : (
                <div className='w-full h-full flex items-center justify-center gap-4'>
                    <img src={endVid ? maleSpeak : maleStatic} alt="" className='w-full h-full object-cover' />
                </div>
            )}

        </div>
    );
};

export default AiCard;