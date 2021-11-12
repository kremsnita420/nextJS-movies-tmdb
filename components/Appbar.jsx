import * as React from 'react'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'

export default function Navbar() {
	return (
		<Container maxWidth='xl'>
			<AppBar position='relative'>
				<Toolbar>
					<Typography variant='h6' component='div'>
						<NextLink href='/'>Next MoviesDB</NextLink>
					</Typography>
				</Toolbar>
			</AppBar>
		</Container>
	)
}
