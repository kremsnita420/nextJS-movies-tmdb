import * as React from 'react'
import {
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Link,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NextLink from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout'

export default function MoviesPage(movies) {
	const BASE_URL = 'https://image.tmdb.org/t/p/original/'
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
	console.log(movies)

	return (
		<Layout title='Top Rated Movies'>
			<Container maxWidth='xl'>
				<Box sx={{ my: 4 }}>
					<Typography
						sx={{ textAlign: 'center', m: '2rem' }}
						variant='h1'
						component='h1'
						gutterBottom>
						Top Rated Movies
					</Typography>
					<Box sx={{ marginBottom: '5rem' }}>
						{movies.movies[0].poster_path ? (
							<Image
								width={800}
								height={400}
								objectFit='contain'
								layout='responsive'
								src={`${IMAGE_BASE_URL}/${movies.movies[0].poster_path}`}
							/>
						) : (
							<Image
								width={800}
								height={400}
								objectFit='contain'
								src='/images/noimage.jpg'
							/>
						)}
					</Box>

					<Grid container spacing={2}>
						{movies.movies.map((movie) => (
							<Grid item xs={6} sm={4} md={3} lg={2} xl={1} key={movie.id}>
								<NextLink href={`/movie/${movie.id}`} passHref>
									<Link>
										<Card fullwidth='true'>
											<CardActionArea>
												<CardMedia
													sx={{ objectFit: 'fill' }}
													component='img'
													height='250'
													image={`${BASE_URL}/${movie.poster_path}`}
													alt={movie.title}
												/>
												<CardContent sx={{ minHeight: 150 }}>
													<Typography gutterBottom variant='h6' component='h6'>
														{movie.title}
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									</Link>
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
		'https://api.themoviedb.org/3/movie/popular?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&page=1'
	)
	const data = await res.json()

	return {
		props: {
			movies: data.results,
		},
	}
}
