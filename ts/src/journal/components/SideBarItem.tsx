import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useAppDispatch } from "../../hooks"
import { setActiveNote } from "../../store/journal"

type Props ={
	title:string,
	body:string,
	id:string,
	date:number
	imageUrls:string[]
}
export const SideBarItem = ({title, body, id, date, imageUrls}: Props) => {

	const dispatch = useAppDispatch()

	const newTitle = useMemo(() => {
		
		return title.length > 17
			? title.substring(0, 17) + '...'
			: title
	}, [title])

	const onActiveNote = () => {

		dispatch( setActiveNote({title, body, id,date, imageUrls}) )
	}

	return (
		<ListItem
			key={id} disablePadding
		>
			<ListItemButton onClick={ onActiveNote }>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>

				<Grid container>
					<ListItemText primary={ newTitle } />
					<ListItemText secondary={ body } />
				</Grid>
			</ListItemButton>
		</ListItem>
	)
}
