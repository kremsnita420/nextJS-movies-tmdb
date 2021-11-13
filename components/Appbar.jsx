import * as React from 'react'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'

export default function Navbar() {
	return (
		<AppBar position='relative'>
			<Container maxWidth='xl'>
				<Toolbar>
					<Typography variant='h6' component='div'>
						<NextLink href='/'>Next MoviesDB</NextLink>
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
