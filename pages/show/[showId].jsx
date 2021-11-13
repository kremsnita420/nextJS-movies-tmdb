import Layout from '../../components/Layout'

export default function ShowPage(show) {
	console.log(show.show)
	return <Layout title={show.show.name}>{show.show.name}</Layout>
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
