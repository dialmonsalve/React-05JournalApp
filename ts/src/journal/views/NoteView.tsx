import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'

import { Button, Grid, TextField, Typography, } from '@mui/material'
import { DeleteOutline, SaveOutlined } from '@mui/icons-material'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components'
import { setActiveNote, starSavedNote, startDeletingNote } from '../../store/journal'

export const NoteView = () => {

	const dispatch = useAppDispatch()

	const { active: note, messagedSaved, isSaving } = useAppSelector(state => state.journal)
	const { body, title, date, onInputChange, formState } = useForm(note, {})

	const dateString = useMemo(() => {
		
		const newDate = new Date(date);
		return newDate.toUTCString()

	}, [date])

	useEffect(() => {
		dispatch(setActiveNote(formState) )
	}, [formState])

	useEffect(() => {
		
		if ( messagedSaved.length > 0){
			Swal.fire('Nota actualizada', messagedSaved, 'success')
		}
	}, [messagedSaved])
	

	const onSaveNote = () => {
		dispatch( starSavedNote() );
	}

	const onDelete = () => {
		dispatch( startDeletingNote() )
	}

	return (
		<Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
			<Grid item>
				<Typography fontSize={39} fontWeight="light" >{dateString}</Typography>
			</Grid>
			<Grid item>
				<Button 
					disabled={ isSaving }
					onClick={ onSaveNote } 
					color='primary'
					sx={{ padding: 2 }}>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Entry your title"
					label="title"
					sx={{ border: 'none', mb: 1 }}
					name="title"
					value={ title }
					onChange={ onInputChange }

				/>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="What happened to you today??"
					minRows={5}
					name="body"
					value={ body }
					onChange={ onInputChange }

				/>
			</Grid>
			<Grid container justifyContent='end'>
				<Button 
					onClick={onDelete}
					color="error"	
					sx={{ mt:2 }}
				>
					<DeleteOutline />
					Borrar
				</Button>

			</Grid>

			<ImageGallery />

		</Grid>
	)
}
