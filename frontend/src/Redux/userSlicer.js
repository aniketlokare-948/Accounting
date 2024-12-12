// src/Redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstname: '', // initial value is empty
  },
  reducers: {
    setFirstname: (state, action) => {
      state.firstname = action.payload; // set firstname in the store
    },
  },
});

export const { setFirstname } = userSlice.actions;

export default userSlice.reducer;
