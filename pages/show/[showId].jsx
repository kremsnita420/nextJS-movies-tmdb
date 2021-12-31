import Image from 'next/image'
import NextLink from 'next/link'
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Link,
} from '@mui/material'
import Layout from '../../components/Layout'

export default function ShowPage(show) {
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

	const showData = show.show
	const castList = show.cast

	console.log(showData)
	console.log(castList)
	return (
		<Layout title={showData.title}>
			<Typography
				variant='h1'
				component='h1'
				sx={{ textAlign: 'center', m: '2rem' }}>
				{showData.name || showData.title}
			</Typography>
			{showData.poster_path || showData.backdrop_path ? (
				<Image
					width={800}
					height={450}
					priority
					layout='responsive'
					src={`${BASE_URL}/${showData.poster_path || showData.backdrop_path}`}
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

			<Grid container spacing={2} sx={{ paddingBottom: '5rem' }}>
				{castList.map((actor) => (
					<Grid item xs={6} sm={4} md={3} lg={2} key={actor.id}>
						<NextLink href={`/actor/${actor.id}`} passHref>
							<Link>
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
	const { showId } = context.query

	//fetch movie
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos,people`
	)
	const showData = await response.json()

	//fetch cast
	const castResponse = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos,people`
	)

	const castData = await castResponse.json()

	return {
		props: {
			show: showData,
			cast: castData.cast,
		},
	}
}
