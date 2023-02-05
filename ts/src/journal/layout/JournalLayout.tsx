import { Box, Toolbar } from '@mui/material'
import { Navbar, Sidebar } from '../components'

type props={
	children:JSX.Element | JSX.Element[],
}

const drawerWidth:number = 280

export const JournalLayout = ({children}:props) => {

	
	return (
		<Box sx={{ display:'flex' }}>
			<Navbar drawerWidth={ drawerWidth } />
			<Sidebar drawerWidth={ drawerWidth } />

			<Box 
				component="main"
				sx={{ flexGrow:1, p:3 }}
			>

				<Toolbar/>

				{ children }

			</Box>

		</Box>
	)
}
