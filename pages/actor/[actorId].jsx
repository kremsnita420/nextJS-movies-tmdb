import NextLink from 'next/link'
import Image from 'next/image'
import { Chip, Divider, Grid, Link, Typography } from '@mui/material'
import Layout from '../../components/Layout'

export default function ActorsPage(actor) {
	const actorData = actor.actor
	const actorCredits = actor.actor.combined_credits.cast

	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

	console.log(actorData)
	console.log(actorCredits)

	//calculate actor age and return years
	let currentTime = new Date().getTime()
	let birthDateTime = new Date(actorData.birthday).getTime()
	let difference = currentTime - birthDateTime
	var ageInYears = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))

	return (
		<Layout title={actorData.name}>
			<Typography gutterBottom variant='h1' component='h1'>
				{actorData.name}
			</Typography>
			<Grid container spacing={4}>
				{/* left side */}
				<Grid item md={4}>
					<Image
						src={`${IMAGE_BASE_URL}/${actorData.profile_path}`}
						width={700}
						height={900}
					/>
					<Divider>Info</Divider>
					<Typography gutterBottom variant='p' component='p'>
						Name: {actorData.name}
					</Typography>
					<Typography gutterBottom variant='p' component='p'>
						Known For: {actorData.known_for_department}
					</Typography>
					<Typography gutterBottom variant='p' component='p'>
						Birthday: {actorData.birthday} ({ageInYears} years old)
					</Typography>
					<Typography gutterBottom variant='p' component='p'>
						Birthplace: {actorData.place_of_birth}
					</Typography>
					<Divider />
				</Grid>

				{/* right side */}
				<Grid item md={8}>
					<Typography gutterBottom variant='h4' component='h4'>
						Known For
					</Typography>

					<Grid container spacing={2}>
						{actorCredits.map((credit) => (
							<Grid item xs={4} sm={3} md={2} key={credit.credit_id}>
								<NextLink
									passHref
									href={
										credit.media_type === 'movie'
											? `/movie/${credit.id}`
											: `/show/${credit.id}`
									}>
									<Link>
										{credit.poster_path ? (
											<Image
												src={`${IMAGE_BASE_URL}/${credit.poster_path}`}
												width={400}
												height={500}
											/>
										) : (
											<Image
												src='/images/noimage.jpg'
												width={400}
												height={500}
											/>
										)}

										<Typography variant='p' component='p'>
											{credit.title || credit.name}
										</Typography>
									</Link>
								</NextLink>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const { actorId } = context.query

	//fetch actors data
	const actorResponse = await fetch(
		`https://api.themoviedb.org/3/person/${actorId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=combined_credits`
	)
	const actorData = await actorResponse.json()

	return {
		props: {
			actor: actorData,
		},
	}
}
