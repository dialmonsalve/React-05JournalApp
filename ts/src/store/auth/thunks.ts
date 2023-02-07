
import { checkingCredentials, login, logout } from "./authSlice"
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from "../store"
import { loginWithEmailPassword, logOutFireBase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { IUser } from "../../auth/interfaces/IUser"
import { Form } from "../../hooks"
import { clearNotesLogOut } from "../journal"

export const checkingAuthentication = (email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async dispatch => {

		dispatch(checkingCredentials())

	}
}

export const startGoogleSignIn = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async dispatch => {
		dispatch(checkingCredentials());

		const result = await singInWithGoogle();

		console.log(result.errorMessage)
		if (!result.ok) return dispatch(logout(result.errorMessage));

		dispatch(login(result as IUser))
	}
}

type CreateUser = {
	displayName: string,
	email: string;
	password: string;
}


export const startCreatingUserEmailAndPassword = ({ email, password, displayName }: CreateUser): ThunkAction<void, RootState, unknown, AnyAction> => {

	return async dispatch => {
		dispatch(checkingCredentials());

		const result = await registerUserWithEmailPassword({ email, password, displayName })

		if (typeof result === 'undefined') return

		if (!result.ok) return dispatch(logout(result.errorMessage))

		dispatch(login(result as IUser))

	}

}

interface UserLogin extends Form {
	email: string;
	password: string;
}

export const starLoginWithEmailAndPassword = ({ email, password }: UserLogin): ThunkAction<void, RootState, unknown, AnyAction> => {

	return async dispatch => {

		dispatch(checkingCredentials())

		const result = await loginWithEmailPassword({ email, password });

		if (!result.ok) return dispatch(logout(result.errorMessage))

		dispatch(login(result as IUser))
	}
}

export const startLogout = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async dispatch => {

		await logOutFireBase();

		dispatch( clearNotesLogOut() )
		dispatch(logout(''))

	}
}