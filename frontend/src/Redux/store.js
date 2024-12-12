// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true, // Enable Redux DevTools
});

export default store;
