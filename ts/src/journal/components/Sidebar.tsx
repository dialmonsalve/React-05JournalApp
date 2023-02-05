import { 
	Box, 
	Divider, 
	Toolbar,
	Grid, 
	List, 
	ListItem, 
	ListItemButton, 
	ListItemIcon, 
	ListItemText, 
	Typography, 
	Drawer 
} from '@mui/material'
import {  TurnedInNot } from '@mui/icons-material'

type props={
	drawerWidth:number
}
export const Sidebar = ({ drawerWidth }:props) => {
	return (
		<Box 
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
		>
			<Drawer
				variant="permanent"//temporarry
				open
				sx={{
					display: { xs: 'block'},
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
				}}
			>

				<Toolbar>
					<Typography variant='h6' noWrap component="div" >
							Diego Monsalve
					</Typography>
				</Toolbar>
				<Divider/>

				<List>
					{
						['January', 'February', 'March', 'April'].map( text => (
							<ListItem
								key={text} disablePadding
							>
								<ListItemButton>
									<ListItemIcon>
										<TurnedInNot/>
									</ListItemIcon>										
								</ListItemButton>

								<Grid container>
									<ListItemText primary={text}/>
									<ListItemText secondary={ 'Lorem ipsum dolor sit amet consectetur, adipisicing'}/>
								</Grid>
							</ListItem>
						))
					}
				</List>

			</Drawer>
		</Box>
	)
}
