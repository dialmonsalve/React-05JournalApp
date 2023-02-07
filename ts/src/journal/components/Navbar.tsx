import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material'
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material'
import { useAppDispatch } from '../../hooks'
import { startLogout } from '../../store/auth'


type props = {
	drawerWidth: number
}

export const Navbar = ({ drawerWidth = 240 }: props) => {

	const dispatch = useAppDispatch();

	const onLogout = () => {
		dispatch(startLogout())
	}
	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` }
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					edge="start"
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuOutlined />
				</IconButton>

				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant='h6' noWrap component="div">JournalApp</Typography>

					<IconButton
						color="error"
						onClick={onLogout}
					>
						<LogoutOutlined />
					</IconButton>

				</Grid>
			</Toolbar>

		</AppBar>
	)
}
