import NextLink from 'next/link'
import { Link, Typography } from '@mui/material'
import Layout from '../../components/Layout'

export default function ActorsPage(actor) {
	const actorData = actor.actor
	const actorCredits = actor.actor.combined_credits.cast

	console.log(actorData)
	console.log(actorCredits)

	return (
		<Layout title={actorData.name}>
			<Typography gutterBottom variant='h1' component='h1'>
				{actorData.name}
			</Typography>

			<ul>
				{actorCredits.map((credit) => (
					<NextLink
						passHref
						key={credit.credit_id}
						href={
							credit.media_type === 'movie'
								? `/movie/${credit.id}`
								: `/show/${credit.id}`
						}>
						<li>
							<a>
								{credit.media_type} - {credit.title || credit.name}
							</a>
						</li>
					</NextLink>
				))}
			</ul>
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
