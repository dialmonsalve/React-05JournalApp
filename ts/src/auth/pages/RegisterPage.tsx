import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Form, useAppDispatch, useAppSelector, useForm, validField } from '../../hooks';
import { useMemo, useState } from 'react';
import { startCreatingUserEmailAndPassword } from '../../store/auth';

interface CreateUser extends Form {
	displayName: string,
	email: string;
	password: string;
}

const formData: CreateUser = {
	displayName: 'Diego',
	email: 'diego@diego.com',
	password: '1234556',
}

const formValidations: validField = {
	email: [(value: string) => value.includes('@'), 'El correo debe tener una @'],
	password: [(value: string) => value.length >= 6, 'El password debe tener más de 6 caracteres'],
	displayName: [(value: string) => value.length >= 1, 'El campo es requerido'],
}

export const RegisterPage = () => {

	const dispatch = useAppDispatch()
	const [formSubmitted, setFormSubmitted] = useState(false)

	const { status, errorMessage } = useAppSelector(state => state.auth)
	const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

	const {
		formState, displayName, email, password, onInputChange,
		isFormValid, displayNameValid, emailValid, passwordValid, } = useForm(formData, formValidations)

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFormSubmitted(true);

		if (!isFormValid) return;

		dispatch(startCreatingUserEmailAndPassword({ displayName, email, password, }))

	}
	return (
		<AuthLayout title="Create account">

			<form onSubmit={onSubmit}  >
				<Grid container>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Name"
							type="text"
							placeholder='Your name'
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder='correo@correo.com'
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="password"
							type="password"
							placeholder='Your password'
							fullWidth
							autoComplete='on'
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
						<Grid item
							xs={12}
							display={!!errorMessage ? '' : 'none'}
						>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} >
							<Button
								disabled={isCheckingAuthentication}
								type="submit"
								variant="contained" fullWidth>
								Create account
							</Button>
						</Grid>

						<Grid container direction="row" justifyContent="end">
							<Typography sx={{ mr: 1 }} >Do you have account?</Typography>
							<Link component={RouterLink} color="inherit" to="/auth/login" >
								Create account
							</Link>

						</Grid>

					</Grid>

				</Grid>

			</form>
		</AuthLayout>
	)
}

