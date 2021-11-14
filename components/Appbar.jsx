import * as React from 'react'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { Box } from '@mui/system'

export default function Navbar() {
	return (
		<AppBar position='relative'>
			<Container maxWidth='xl'>
				<Toolbar>
					<Typography variant='h6' component='div'>
						<NextLink href='/'>Next MoviesDB</NextLink>
					</Typography>

					<Box style={{ flexGrow: '1' }} />

					<NextLink href='/movies'>
						<Button>Movies</Button>
					</NextLink>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
