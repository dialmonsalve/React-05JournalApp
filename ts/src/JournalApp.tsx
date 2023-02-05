import { AppRouter } from "./router/AppRouter"
import { Apptheme } from "./theme"

export const JournalApp = () => {
	return (
		<Apptheme>
			<AppRouter />
		</Apptheme>
	)
}
