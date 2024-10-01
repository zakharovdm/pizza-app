import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		logout: (state) => {
			state.jwt = null;
		}
	}
});

export default UserSlice.reducer;
export const userActions = UserSlice.actions;