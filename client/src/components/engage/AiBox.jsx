import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, IconButton, Tooltip, Input } from '@mui/material';
import AiCard from './AiCard';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { toggleAudio, toggleVideo } from '../../redux/features/aiCard';
import Autocomplete from "react-google-autocomplete";
import { setDestinationInfo, setStartLocationInfo } from '../../redux/features/querySlice';
import { setEndVid } from '../../redux/features/aiCard';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Spin as Hamburger } from 'hamburger-react'
import { toast } from 'react-toastify';
import Api from '../../api';

const AiBox = ({ setCustomMsg, allChats }) => {
    const dispatch = useDispatch();
    const { audio, video, endVid } = useSelector((state) => state.aiCard);
    const { startLocationInfo, destinationInfo } = useSelector((state) => state.query);

    useEffect(() => {
        // Fetch current location and set it as the default start location
        console.log(navigator.geolocation)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
                        if (status === "OK" && results[0]) {
                            const currentLocation = {
                                short_name: results[0].formatted_address,
                                geometry: results[0].geometry.location,
                            };
                            dispatch(setStartLocationInfo(currentLocation));
                        } else {
                            console.error("Geocoder failed due to: ", status);
                        }
                    });
                },
                (error) => {
                    console.error("Error getting current location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);
    
    useEffect(() => {
        console.log(startLocationInfo, destinationInfo);
    }, [startLocationInfo, destinationInfo]);

    return (
        <div className='w-full h-full flex flex-col items-center gap-4 relative'>
            <AiCard allChats={allChats}/>
            <div className='w-full flex items-center justify-around'>
                <Tooltip title={video ? 'Turn Off Video' : 'Turn On Video'} arrow>
                    <IconButton sx={{
                        color: 'white',
                        padding: '10px',
                        backgroundColor: '#662d91',
                        '&:hover': {
                            backgroundColor: '#662d91',
                        },
                    }}
                        onClick={() => dispatch(toggleVideo(!video))}
                    >
                        {video ? (<VideocamOffOutlinedIcon sx={{ fontSize: '2rem' }} />) : (<VideocamOutlinedIcon sx={{ fontSize: '2rem' }} />)}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'Stop'} arrow>
                    <IconButton sx={{
                        color: 'white',
                        padding: '10px',
                        backgroundColor: '#662d91',
                        '&:hover': {
                            backgroundColor: '#662d91',
                        },
                    }}
                        onClick={() => {
                            window.speechSynthesis.cancel()
                            dispatch(setEndVid(false));
                        }}
                    >
                        <StopCircleIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={!audio ? 'Turn Off Audio' : 'Turn On Audio'} arrow>
                    <IconButton sx={{
                        color: 'white',
                        padding: '10px',
                        backgroundColor: '#662d91',
                        '&:hover': {
                            backgroundColor: '#662d91',
                        }
                    }}
                        onClick={() => dispatch(toggleAudio(!audio))}
                    >
                        {!audio ? (<MicOffOutlinedIcon sx={{ fontSize: '2rem' }} />) : (<MicNoneOutlinedIcon sx={{ fontSize: '2rem' }} />)}
                    </IconButton>
                </Tooltip>
            </div>
            <div className='w-full'>
                <span>
                    From:
                </span>
                <Autocomplete
                    apiKey={'AIzaSyDtnPmw3rJGTqdCbNl_GAHvNK6XHEO-0aU'}
                    onPlaceSelected={(place) => {
                        console.log(place);
                        dispatch(setStartLocationInfo(place));
                    }}
                    // value={startLocationInfo.short_name}
                    onChange={(e) => {
                        console.log(e.target.value);
                        dispatch(setStartLocationInfo({ short_name: e.target.value }));
                    }}
                    style={{
                        padding: '10px',
                        borderRadius: '100px',
                        width: '100%',
                    }}
                />
            </div>
            <div className='w-full'>
                <span>
                    To:
                </span>
                <Autocomplete
                    apiKey={'AIzaSyDtnPmw3rJGTqdCbNl_GAHvNK6XHEO-0aU'}
                    onPlaceSelected={(place) => {
                        console.log(place);
                        dispatch(setDestinationInfo(place));
                    }}
                    // value={destinationInfo.short_name}
                    style={{
                        padding: '10px',
                        borderRadius: '100px',
                        width: '100%',
                    }}
                />
            </div>
        </div>
    );
};

export default AiBox;