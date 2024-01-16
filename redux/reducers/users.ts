import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomUser } from '../../api/model/userModel';
import type { RootState } from '../store';

// Define a type for the slice state
export interface UserState {
  user: CustomUser | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {
    id: '',
    email: '',
    displayName: '',
    photoURL: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CustomUser | null>) => {
      state.user = action.payload;
    },
    setSignOutState: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setSignOutState } = userSlice.actions;

// Selector to get the user from the state
export const currentUser = (state: RootState) => state.user.user;

export default userSlice.reducer;