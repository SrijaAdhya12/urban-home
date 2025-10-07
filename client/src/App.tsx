import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PropertyDetails from './pages/PropertyDetails'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import HealthCheck from './components/HealthCheck'
// ✅ import added

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/property/:id" element={<PropertyDetails />} />
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						{/* ✅ Added Health Check route */}
						<Route path="/health" element={<HealthCheck />} />
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	)
}

export default App
