import { useState } from 'react';

import {Link as RouterLink} from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
	displayName :'',
	email: '',
	password: ''
}

export const RegisterPage = () => {

	const dispatch = useDispatch()

	const [formSubmitted, setFormSubmitted] = useState(false)

	const { status, errorMessage} = useSelector(state => state.auth);

	const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

	const formValidations = {

		email:[(value ) =>value.includes('@'), 'El correo debe tener una @'],
		password:[(value ) =>value.length >= 6,'El password debe tener al mas de 6 caracteres'],
		displayName:[(value ) =>value.length >= 1,'El nombre es obligatorio'],
	}

	const { 
		formState, displayName, email, password, onInputChange,
		isFormValid, displayNameValid, emailValid, passwordValid
	} = useForm(formData, formValidations);

	const onSubmit = (e) =>{

		e.preventDefault();

		setFormSubmitted(true);

		if( !isFormValid ) return;

		dispatch(startCreatingUserWithEmailPassword(formState))

	}

	return (
		<AuthLayout title="Crear cuenta">
			
			<form onSubmit={ onSubmit } >
				<Grid container>
					<Grid item xs={ 12 } sx={{ mt: 2 }}>
						<TextField
						label="Nombre completo"
						type="text"
						placeholder="Tu nombre"
						fullWidth
						value={ displayName }
						name='displayName'
						onChange={ onInputChange }
						error={!!displayNameValid && formSubmitted}
						helperText={displayNameValid}

						/>
					</Grid>

					<Grid item xs={ 12 } sx={{ mt: 2 }}>
						<TextField
						label="correo"
						type="email"
						placeholder="correo@correo.com"
						fullWidth
						value={ email }
						name='email'
						onChange={ onInputChange }
						error={ !!emailValid && formSubmitted }
						helperText={ emailValid }
						/>
					</Grid>

					<Grid item xs={ 12 } sx={{ mt: 2 }}>
						<TextField
						label="Contraseña"
						type="password"
						placeholder="Contraseña"
						fullWidth
						value={ password }
						name='password'
						onChange={ onInputChange }
						error={ !!passwordValid && formSubmitted }
						helperText={ passwordValid }
						/>
					</Grid>

					<Grid container spacing={ 2 } sx={{ mb: 2 , mt: 1}} >
						<Grid item xs={ 12 }>
							<Button 
								disabled={ isCheckingAuthentication}
								type='submit'
								variant='contained' 
								fullWidth
								>
								Crear cuenta
							</Button>
						</Grid>
						<Grid 
							item 
							xs={ 12 }
							display={ !!errorMessage ? '' : 'none'}
							>
								<Alert severity='error'> { errorMessage } </Alert>
						</Grid>
					</Grid>

					<Grid container direction='row' justifyContent='end'>
						<Typography sx={{ mr: 1 }} >¿Ya tienes una cuenta?</Typography>
						<Link component={RouterLink} color='inherit' to="/auth/login">
							Ingresar
						</Link>								
					</Grid>
				</Grid>
			</form>
		</AuthLayout>

	)
}
