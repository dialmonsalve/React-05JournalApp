import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { journalSlice } from './journal';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		journal: journalSlice.reducer,
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {auth: authSlice.reducer, }
export type AppDispatch = typeof store.dispatch