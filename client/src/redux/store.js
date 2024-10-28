import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./features/uislice";
import { aiCardSlice } from "./features/aiCard";
import { querySlice } from "./features/querySlice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        aiCard: aiCardSlice.reducer,
        query: querySlice.reducer,
    },
});

export default store;