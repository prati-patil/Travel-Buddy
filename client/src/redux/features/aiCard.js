import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audio: false,
  video: true,
  endVid: false,
  speakText : "",
  chatSaveChange: false,
  viewSavedChats: false,
  resLoading: false,
};

export const aiCardSlice = createSlice({
  name: 'aiCard',
  initialState,
  reducers: {
    toggleAudio: (state, action) => {
      state.audio = action.payload;
    },
    toggleVideo: (state, action) => {
      state.video = action.payload;
    },
    setSpeakText: (state, action) => {
      state.speakText = action.payload;
    },
    setchatSaveChange: (state, action) => {
      state.chatSaveChange = action.payload;
    },
    setViewSavedChats: (state, action) => {
    //   console.log("yoooooooooooooooooooooooooooooo")
      state.viewSavedChats = action.payload;
    },
    setEndVid: (state, action) => {
      state.endVid = action.payload;
    },
    setResLoading: (state, action) => {
      state.resLoading = action.payload;
    }
  },
});

export const { toggleAudio, toggleVideo, setSpeakText, setchatSaveChange, setViewSavedChats, setEndVid, setResLoading } = aiCardSlice.actions;
