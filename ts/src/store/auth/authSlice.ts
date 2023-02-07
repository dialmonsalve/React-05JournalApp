import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { IUser } from '../../auth/interfaces/IUser';

const initialState: IUser = {
	ok: false,
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state: IUser, { payload }: PayloadAction<IUser>) => {

			state.status = 'authenticated';
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoURL = payload.photoURL;
			state.errorMessage = null;

		},
		logout: (state: IUser, { payload }: PayloadAction<string>) => {
			state.status = 'not authenticated';
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.errorMessage = payload;
		},
		checkingCredentials: (state: IUser) => {
			state.status = 'checking';


		},
	}
});
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;

export const selectEmail = (state: RootState) => state.auth.email