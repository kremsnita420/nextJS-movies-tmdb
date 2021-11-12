import Head from 'next/head'
import {
	Container,
	ThemeProvider,
	CssBaseline,
	createTheme,
} from '@mui/material'
import classes from '../src/styles'

import Navbar from './Appbar'

export default function Layout({ title, description, children }) {
	const theme = createTheme({
		components: {
			MuiLink: {
				defaultProps: {
					underline: 'hover',
				},
			},
		},

		typography: {
			h1: {
				fontSize: '3rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
			h2: {
				fontSize: '2rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
		},
		palette: {
			mode: 'dark',
			primary: {
				main: '#f0c000',
			},
			secondary: {
				main: '#208080',
			},
		},
	})

	return (
		<>
			<Head>
				<title>
					{title ? `${title} - Next Movie Database` : 'Next Movie Database'}
				</title>
				{description && <meta name='description' content={description} />}
			</Head>

			<ThemeProvider theme={theme}>
				<Navbar />
				<CssBaseline />
				<Container maxWidth='xl' sx={classes.main}>
					{children}
				</Container>
			</ThemeProvider>
		</>
	)
}
