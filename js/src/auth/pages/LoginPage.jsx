import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
	email: '',
	password : ''

}

export const LoginPage = () => {

	const{status, errorMessage} = useSelector( state => state.auth);


	const dispatch =  useDispatch()
	//const {checkingCredential} = useSelector( state => state.)

	const {email, password, onInputChange} = useForm(formData);

	const isAutheticating = useMemo( () => status ==='checking', [status])

	const onSubmit = (e) => {

		e.preventDefault();

		dispatch(startLoginWithEmailPassword({email, password}))

	};

	const onGoogleSignIn = () =>{

		dispatch(startGoogleSignIn());
	}


	return (
		<AuthLayout title="Login">
			
			<form onSubmit={ onSubmit } >
				<Grid container>
					<Grid item xs={ 12 } sx={{ mt: 2 }}>
						<TextField
						label="correo"
						type="email"
						placeholder="correo@correo.com"
						fullWidth
						value={ email }
						name= "email"
						onChange={ onInputChange }
						/>
					</Grid>

					<Grid item xs={ 12 } sx={{ mt: 2 }}>
						<TextField
						label="Contraseña"
						type="password"
						placeholder="Contraseña"
						fullWidth
						value={ password }
						name= "password"
						onChange={ onInputChange }
						/>
					</Grid>

					<Grid container spacing={ 2 } sx={{ mb: 2 , mt: 1}} >
						<Grid item xs={ 12 } sm={ 6 }>
							<Button 
								type="submit" 
								variant='contained' 
								fullWidth
								disabled={isAutheticating}
								>
								Login
							</Button>
						</Grid>

						<Grid item xs={ 12 } sm={ 6 }>
							<Button 
								variant='contained' 
								fullWidth
								onClick={onGoogleSignIn}
								disabled={isAutheticating}
								>
								<Google/>
									<Typography sx={{ml: 1}}></Typography> Google
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
						<Link component={RouterLink} color='inherit' to="/auth/register">
							Crear una cuenta	
						</Link>								
					</Grid>
				</Grid>
			</form>
		</AuthLayout>

	)
}
