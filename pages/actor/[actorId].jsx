import Layout from '../../components/Layout'

export default function ActorsPage(actor) {
	console.log(actor)
	return <Layout title={actor.actor.name}>{actor.actor.name}</Layout>
}

export async function getServerSideProps(context) {
	const { actorId } = context.query

	//fetch actors data
	const actorResponse = await fetch(
		`https://api.themoviedb.org/3/person/${actorId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US`
	)
	const actorData = await actorResponse.json()

	return {
		props: {
			actor: actorData,
		},
	}
}
