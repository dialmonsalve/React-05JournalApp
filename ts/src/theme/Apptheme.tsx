import {ThemeProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { purpleTheme } from './purpleTheme';

type props={
	children:JSX.Element | JSX.Element[]
}

export const Apptheme = ({children}:props) => {
	return (
		<ThemeProvider theme={ purpleTheme }>
			<CssBaseline/>	
			{children}
		</ThemeProvider>
	)
}
