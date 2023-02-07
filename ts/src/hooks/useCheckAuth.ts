import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "./app";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {

	const { status } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch()

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {

			if (!user) return dispatch(logout(''))
			const { uid, displayName, photoURL, email } = user
			dispatch(login({ uid, displayName, photoURL, email }));
			dispatch( startLoadingNotes())
		})

	}, [])
	return status

}
