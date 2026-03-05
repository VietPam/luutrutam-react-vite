import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./app/store"

const theme = createTheme({
	palette: {
		mode: "light"
	}
})

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>
  </Provider>

)