import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';

import { useAppDispatch, useAppSelector, Form, useForm } from '../../hooks';
import { checkingAuthentication, starLoginWithEmailAndPassword, startGoogleSignIn } from '../../store/auth/thunks';
import { useMemo } from 'react';

interface UserLogin extends Form {
	email: string;
	password: string;
}

const user: UserLogin = {
	email: '',
	password: '',
}

export const LoginPage = () => {

	const { status, errorMessage } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch();
	const { email, password, onInputChange } = useForm(user, {})

	const isAuthenticating = useMemo(() => status === 'checking', [status])

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(starLoginWithEmailAndPassword({ email, password }))
	}

	const onGoogleSignIn = () => {

		dispatch(startGoogleSignIn())

	}

	return (
		<AuthLayout title="Login">

			<form onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder='correo@correo.com'
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="password"
							type="password"
							placeholder='Your password'
							fullWidth
							name="password"
							autoComplete='on'
							value={password}
							onChange={onInputChange}
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >

						<Grid item
							xs={12}
							display={!!errorMessage ? '' : 'none'}
						>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>

						<Grid item xs={12} sm={6} >
							<Button
								disabled={isAuthenticating}
								type='submit'
								variant="contained"
								fullWidth
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={12} sm={6} >
							<Button
								disabled={isAuthenticating}
								onClick={onGoogleSignIn}
								variant="contained"
								fullWidth
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
						<Grid container direction="row" justifyContent="end">
							<Link component={RouterLink} color="inherit" to="/auth/register" >
								Crear cuenta
							</Link>

						</Grid>

					</Grid>

				</Grid>

			</form>
		</AuthLayout>
	)
}
