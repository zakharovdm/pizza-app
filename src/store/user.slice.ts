import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  jwt: string | null 
}

const initialState: UserState = {
	jwt: null
}; 

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addJwt: (state) => {
			state.jwt = 'sdsds';
		},
		logout: (state) => {
			state.jwt = null;
		}
	}
});

export default UserSlice.reducer;
export const userActions = UserSlice.actions;