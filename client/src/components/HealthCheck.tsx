import React, { useEffect, useState } from 'react'
import { fetchHealthStatus } from '../api'

const HealthCheck: React.FC = () => {
	const [status, setStatus] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchHealth = async () => {
			try {
				const data = await fetchHealthStatus()
				setStatus(data)
			} catch (err) {
				console.error(err)
				setStatus('DOWN')
			} finally {
				setLoading(false)
			}
		}

		fetchHealth()
	}, [])

	const getStatusStyle = (): React.CSSProperties => {
		if (loading) return { color: 'gray' }
		return status === 'OK' ? { color: 'green' } : { color: 'red' }
	}

	return (
		<div style={{ textAlign: 'center', marginTop: '40px' }}>
			<h2>Server Health Check</h2>
			<p style={{ fontSize: '1.5rem', fontWeight: 'bold', ...getStatusStyle() }}>
				{loading ? 'Checking...' : status}
			</p>
		</div>
	)
}

export default HealthCheck
