import { ThunkAction } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { INote } from '../../journal/interfaces/IJournal';
import { RootState } from '../store';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, } from './journalSlice';
import { loadNotes } from '../../helpers';


export const startNewNote = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {

		dispatch(savingNewNote())

		const { uid } = getState().auth
		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
		const newNote: INote = {
			id: newDoc.id,
			title: '',
			body: '',
			date: new Date().getTime(),
			imageUrls: []
		}
		await setDoc(newDoc, newNote)

		dispatch(addNewEmptyNote(newNote))
		dispatch(setActiveNote(newNote))
	}
}

export const startLoadingNotes = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;
		if (!uid) throw new Error('El uid del usuario no existe')

		await loadNotes(uid);

		const notes = await loadNotes(uid)

		dispatch(setNotes(notes))

	}
}

export const starSavedNote = (): ThunkAction<void, RootState, unknown, AnyAction> => {

	return async (dispatch, getState) => {

		dispatch(setSaving() )
		const { uid } = getState().auth;
		const { active:note } = getState().journal;

		const noteFireStore =  {...note};
		delete noteFireStore.id

		const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${note?.id}`);

		await setDoc(docRef , noteFireStore, { merge:true })

		dispatch( updateNote ( note as INote ))
	}
}

export const startDeletingNote = (): ThunkAction<void, RootState, unknown, AnyAction> => {

	return async (dispatch, getState) =>{

		const { uid } = getState().auth;
		const { active:note } = getState().journal;

		if(typeof note ==='undefined' || note === null) return

		const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`)

		await deleteDoc( docRef);		

		dispatch(deleteNoteById(note.id));
	}
}