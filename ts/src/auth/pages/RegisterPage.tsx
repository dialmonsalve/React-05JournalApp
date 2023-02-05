import {Link as RouterLink} from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
	return (
		<AuthLayout title="Create account">

			<form>
				<Grid container>
					
					<Grid item xs={ 12 } sx={{ mt:2}}>
						<TextField
							label="Name"
							type="text"
							placeholder='Your name'
							fullWidth
						/>
					</Grid>

					<Grid item xs={ 12 } sx={{ mt:2}}>
						<TextField
							label="Correo"
							type="email"
							placeholder='correo@correo.com'
							fullWidth
						/>
					</Grid>

					<Grid item xs={ 12 } sx={{ mt:2}}>
						<TextField
							label="password"
							type="password"
							placeholder='Your password'
							fullWidth
							autoComplete='on'
						/>
					</Grid>

					<Grid container spacing={ 2 } sx={{mb: 2, mt:1}} >
						<Grid item xs={ 12 } >
							<Button variant="contained" fullWidth>
								Create account
							</Button>							
						</Grid>

						<Grid container direction="row" justifyContent="end">
							<Typography sx={{mr: 1}} >Do you have account?</Typography>
							<Link component={ RouterLink } color="inherit" to="/auth/login" >
							Create account
							</Link>

						</Grid>

					</Grid>

				</Grid>

			</form>
		</AuthLayout>
	)
}

