import { Typography } from '@mui/material'
import Layout from '../components/Layout'

export default function HpmePage() {
	return (
		<Layout title='Home Page'>
			<Typography
				variant='h1'
				component='h1'
				style={{ textAlign: 'center', margin: '2rem' }}>
				Home Page
			</Typography>
		</Layout>
	)
}
