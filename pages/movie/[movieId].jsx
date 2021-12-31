import {
	Grid,
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
	Typography,
	Link,
	Box,
} from '@mui/material'
import Image from 'next/image'
import Layout from '../../components/Layout'
import NextLink from 'next/link'

export default function MoviePage(movie) {
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

	const movieData = movie.movie
	const castList = movie.cast

	console.log(movieData)
	console.log(castList)
	return (
		<Layout title={movieData.title}>
			<Typography
				variant='h1'
				component='h1'
				sx={{ textAlign: 'center', margin: '2rem' }}>
				{movieData.title}
			</Typography>
			<Box sx={{ marginBottom: '5rem' }}>
				{' '}
				{movieData.poster_path ? (
					<Image
						width={800}
						height={400}
						objectFit='contain'
						layout='responsive'
						src={`${BASE_URL}/${movieData.poster_path}`}
					/>
				) : (
					<Image
						width={800}
						height={400}
						objectFit='contain'
						layout='responsive'
						src='/images/noimage.jpg'
					/>
				)}
			</Box>

			<Typography
				sx={{ textAlign: 'center', m: '2rem' }}
				variant='h2'
				component='h2'
				gutterBottom>
				Cast Crew
			</Typography>

			<Grid container spacing={2} sx={{ paddingBottom: '5rem' }}>
				{castList.map((actor) => (
					<Grid item xs={6} sm={4} md={3} lg={2} key={actor.id}>
						<NextLink href={`/actor/${actor.id}`} passHref>
							<Link>
								<Card>
									<CardActionArea>
										{actor.profile_path || actor.backdrop_path ? (
											<CardMedia
												sx={{ objectFit: 'cover' }}
												component='img'
												height='250'
												image={`${IMAGE_BASE_URL}/${
													actor.profile_path || actor.backdrop_path
												}`}
												alt={actor.character}
											/>
										) : (
											<CardMedia
												sx={{ objectFit: 'cover' }}
												component='img'
												height='250'
												image='/images/noimage.jpg'
												alt={actor.character}
											/>
										)}

										<CardContent sx={{ minHeight: 100 }}>
											<Typography gutterBottom variant='body2' component='p'>
												{actor.name}
											</Typography>
											<Typography variant='p' color='text.secondary'>
												As {actor.character}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Link>
						</NextLink>
					</Grid>
				))}
			</Grid>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const { movieId } = context.query

	//fetch movie
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos,people`
	)
	const movieData = await response.json()

	//fetch cast
	const castResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos,people`
	)

	const castData = await castResponse.json()

	return {
		props: {
			movie: movieData,
			cast: castData.cast,
		},
	}
}
