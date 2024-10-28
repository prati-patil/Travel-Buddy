import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
    name: 'query',
    initialState: {
        startLocationInfo: {},
        destinationInfo: {},
        currChat: [],
    },
    reducers: {
        setStartLocationInfo: (state, action) => {
            state.startLocationInfo = action.payload;
        },
        setDestinationInfo: (state, action) => {
            state.destinationInfo = action.payload;
        },
        setCurrChat: (state, action) => {
            state.currChat = action.payload;
        }
    },
});

export const { setStartLocationInfo, setDestinationInfo, setCurrChat } = querySlice.actions;