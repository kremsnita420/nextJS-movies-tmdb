import {
	Grid,
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
	Typography,
	Link,
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
				sx={{ textAlign: 'center', m: '2rem' }}>
				{movieData.title}
			</Typography>
			{movieData.backdrop_path ? (
				<Image
					width={800}
					height={450}
					priority
					layout='responsive'
					src={`${BASE_URL}/${
						movieData.backdrop_path || movieData.profile_path
					}`}
				/>
			) : (
				<Image
					width={800}
					height={450}
					priority
					layout='responsive'
					src='/images/noimage.jpg'
				/>
			)}

			<Typography
				sx={{ textAlign: 'center', m: '2rem' }}
				variant='h2'
				component='h2'
				gutterBottom>
				Cast Crew
			</Typography>

			<Grid container spacing={2}>
				{castList.map((actor) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
						<NextLink href={`/actor/${actor.id}`}>
							<Card>
								<CardActionArea>
									{actor.profile_path ? (
										<CardMedia
											component='img'
											height='350'
											image={`${IMAGE_BASE_URL}/${actor.profile_path}`}
											alt={actor.character}
										/>
									) : (
										<CardMedia
											component='img'
											height='350'
											image='/images/noimage.jpg'
											alt={actor.character}
										/>
									)}

									<CardContent>
										<Typography gutterBottom variant='h5' component='div'>
											{actor.name}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											As {actor.character.split('(voice)')}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
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
