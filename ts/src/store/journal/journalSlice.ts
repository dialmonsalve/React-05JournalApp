import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJournal, INote } from '../../journal/interfaces/IJournal';

const initialState: IJournal = {
	isSaving: false,
	messagedSaved: '',
	notes:[],
	active: null
}

export const journalSlice = createSlice({
		name: 'journal',
		initialState,
		reducers: {
				savingNewNote: (state) =>{
					state.isSaving = true
				},

				addNewEmptyNote: (state, action:PayloadAction<INote> ) => {
					state.notes.push( action.payload );
					state.isSaving = false;
				},

				setActiveNote: (state, action:PayloadAction<INote | null> ) => {
					state.active = action.payload
					state.messagedSaved = ''
				},

				setNotes: (state, action ) => {
					state.notes = action.payload
				},

				setSaving: (state ) => {
					state.isSaving = true;
					state.messagedSaved = ''
				},

				updateNote: (state,  action:PayloadAction<INote > ) => {
					state.isSaving = false;
					state.notes = state.notes.map(note => {
						if( note.id === action.payload.id ){
							return action.payload
						}
						return note
					});
					state.messagedSaved = `${action.payload.title}, actualizada correctamente`
				},

				clearNotesLogOut: (state) =>{
					state.isSaving = false;
					state.messagedSaved = '';
					state.notes = [];
					state.active = null;
				},	
				
				deleteNoteById: (state, action:PayloadAction<string> ) => {
					state.active = null;
					state.notes = state.notes.filter(note => note.id !== action.payload)
				},
		}
});
// Action creators are generated for each case reducer function
export const { 
	addNewEmptyNote, 
	clearNotesLogOut,
	deleteNoteById,
	savingNewNote,
	setActiveNote, 
	setNotes, 
	setSaving,	
	updateNote,	
} =  journalSlice.actions;