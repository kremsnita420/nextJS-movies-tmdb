import * as React from 'react'
import {
	AppBar,
	Button,
	Container,
	Link,
	Toolbar,
	Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { Box } from '@mui/system'

export default function Navbar() {
	return (
		<AppBar position='relative'>
			<Container maxWidth='xl'>
				<Toolbar>
					<Typography variant='h6' component='div'>
						<NextLink href='/' passHref>
							<Link>Next MoviesDB</Link>
						</NextLink>
					</Typography>

					<Box style={{ flexGrow: '1' }} />

					<NextLink href='/movies' passHref>
						<Link>
							<Button>Movies</Button>
						</Link>
					</NextLink>
					<NextLink href='/shows' passHref>
						<Link>
							<Button>Shows</Button>
						</Link>
					</NextLink>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
