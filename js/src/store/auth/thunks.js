import { loginWithEmailPassword, logOutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, logout, login } from './';


export const checkingAuthentication = () =>{

	return async( dispatch ) => {

		dispatch(checkingCredentials());

	}
}

export const startGoogleSignIn = () =>{

	return async( dispatch ) => {

		dispatch(checkingCredentials());

		const result = await signInWithGoogle();

		if( !result.ok ) return dispatch(logout( result.errorMessage ))

		dispatch (login( result ))

	}
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) =>{

	return	async (dispatch) => {

		dispatch(checkingCredentials());

		const { ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

		if( !ok ) return dispatch( logout({ errorMessage }) )

		dispatch( login( { uid, displayName, photoURL, email } ) )

	}
}

export const startLoginWithEmailPassword = ({ email, password }) => {

	return async (dispatch) =>{
	
		dispatch(checkingCredentials());

		const { ok, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({email, password})

		if( !ok ) return dispatch(logout( { errorMessage }))

		dispatch (login(  { uid, displayName, photoURL } ))

	}

}

export const startLogout =  () => {

	return async (dispatch) =>{

		await logOutFirebase();

		dispatch(clearNotesLogout())

		dispatch( logout() )
	} 

	

}