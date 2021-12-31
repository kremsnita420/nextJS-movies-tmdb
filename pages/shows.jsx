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
	Link,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NextLink from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout'

export default function MoviesPage(shows) {
	const BASE_URL = 'https://image.tmdb.org/t/p/original/'
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
	console.log(shows)

	return (
		<Layout title='Top Rated Shows'>
			<Container maxWidth='xl'>
				<Box sx={{ my: 4 }}>
					<Typography
						sx={{ textAlign: 'center', m: '2rem' }}
						variant='h1'
						component='h1'
						gutterBottom>
						Top Rated Shows
					</Typography>

					<Box sx={{ marginBottom: '5rem' }}>
						{shows.shows[0].poster_path ? (
							<Image
								width={800}
								height={400}
								objectFit='contain'
								layout='responsive'
								src={`${IMAGE_BASE_URL}/${shows.shows[0].poster_path}`}
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
						{shows.shows.map((show) => (
							<Grid item xs={6} sm={4} md={3} lg={2} xl={1} key={show.id}>
								<NextLink href={`/show/${show.id}`} passHref>
									<Link>
										<Card fullwidth='true'>
											<CardActionArea>
												<CardMedia
													sx={{
														objectFit: 'fill',
														backgroundPosition: 'bottom',
													}}
													component='img'
													height='250'
													image={`${BASE_URL}/${show.poster_path}`}
													alt='show poster'
												/>
												<CardContent sx={{ minHeight: 100 }}>
													<Typography gutterBottom variant='h6' component='div'>
														{show.name}
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
		'https://api.themoviedb.org/3/tv/popular?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&page=1'
	)
	const data = await res.json()

	return {
		props: {
			shows: data.results,
		},
	}
}
