import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { token: null, username: null }, // Update initial state with token and username fields
  reducers: {
    clearUser: (state, action) => {
      return { token: null, username: null };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { clearUser, setToken, setUsername } = userSlice.actions;

export default userSlice.reducer;
