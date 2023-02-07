import {
	Box,
	Divider,
	Toolbar,
	List,
	Typography,
	Drawer
} from '@mui/material'
import { useAppSelector } from '../../hooks'
import { SideBarItem } from './SideBarItem'

type props = {
	drawerWidth: number
}
export const Sidebar = ({ drawerWidth }: props) => {

	const { notes } = useAppSelector(state => state.journal)
	const { displayName } = useAppSelector(state => state.auth)

	const newArray = notes.some(note => {
		if (typeof note.id === 'undefined') {
			return true
		}
		return false
	})

	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
		>
			<Drawer
				variant="permanent"
				open
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
				}}
			>

				<Toolbar>
					<Typography variant='h6' noWrap component="div" >
						{displayName}
					</Typography>
				</Toolbar>
				<Divider />

				<List>
					{
						notes.map(note => (

							<SideBarItem
								key={note.id}
								{...note}
							/>

						))
					}
				</List>

			</Drawer>
		</Box>
	)
}
