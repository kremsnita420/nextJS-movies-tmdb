import * as React from 'react'
import {
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Button,
	CardActionArea,
	CardActions,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NextLink from 'next/link'

import Layout from '../components/Layout'

export default function Index(movies) {
	const BASE_URL = 'https://image.tmdb.org/t/p/original/'
	console.log(movies)

	return (
		<Layout>
			<Container maxWidth='xl'>
				<Box sx={{ my: 4 }}>
					<Typography
						sx={{ textAlign: 'center', m: '2rem' }}
						variant='h1'
						component='h1'
						gutterBottom>
						Top Rated Movies
					</Typography>

					<Grid container spacing={2}>
						{movies.movies.map((movie) => (
							<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
								<NextLink href={`/movie/${movie.id}`} passHref>
									<a className='link'>
										<Card fullwidth='true'>
											<CardActionArea>
												<CardMedia
													component='img'
													height='350'
													image={`${BASE_URL}/${movie.backdrop_path}`}
													alt='movie poster'
												/>
												<CardContent sx={{ height: '150px' }}>
													<Typography gutterBottom variant='h5' component='div'>
														{movie.title}
													</Typography>
													<Typography variant='body2' color='text.secondary'>
														{movie.overview.slice(0, 50)}...
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button
													fullWidth={true}
													size='small'
													variant='contained'
													color='primary'>
													Explore
												</Button>
											</CardActions>
										</Card>
									</a>
								</NextLink>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</Layout>
	)
}

export async function getServerSideProps() {
	const res = await fetch(
		'https://api.themoviedb.org/3/movie/top_rated?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&page=1'
	)
	const data = await res.json()

	return {
		props: {
			movies: data.results,
		},
	}
}
