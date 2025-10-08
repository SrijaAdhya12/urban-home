import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Star, Phone, Mail, Calendar, IndianRupee, ChevronLeft, ChevronRight, Heart, Share } from 'lucide-react'
import { PropertyDetailsType } from '../types'
import { fetchPropertyById } from '../api'
import { useAuth } from '../context/AuthContext'

interface BackendPropertyResponse {
	id: number
	title: string
	description: string
	type: string
	state: string
	city: string
	pincode: string
	locality: string
	landmark: string
	address: string
	owner: {
		id: number
		firstName: string
		middleName: string | null
		lastName: string
		phoneNumber: string
		email: string
		password: string
		role: string
		profilePicture: string | null
		address: string | null
		dateJoined: string | null
		properties: any
	}
	rentAmount: number
	rentType: string
	features: string[]
	restrictions: string[]
	media: string[]
	rating: number
	dateAdded: string
	dateModified: string
}

const PropertyDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { user } = useAuth()
	const [property, setProperty] = useState<PropertyDetailsType | null>(null)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isFavorite, setIsFavorite] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadProperty = async () => {
			if (!id) return

			try {
				setLoading(true)
				const backendData = (await fetchPropertyById(id)) as unknown as BackendPropertyResponse

				const ownerFullName =
					[backendData.owner?.firstName, backendData.owner?.middleName, backendData.owner?.lastName]
						.filter(Boolean)
						.join(' ') || 'N/A'

				const normalizeType = (type: string): 'PG' | 'Flat' | 'Apartment' | 'House' => {
					const typeUpper = type.toUpperCase()
					if (typeUpper === 'APARTMENT') return 'Apartment'
					if (typeUpper === 'FLAT') return 'Flat'
					if (typeUpper === 'HOUSE') return 'House'
					if (typeUpper === 'PG') return 'PG'
					return 'Apartment' 
				}

				const normalizeRentType = (rentType: string): 'monthly' | 'yearly' => {
					return rentType.toLowerCase() === 'yearly' ? 'yearly' : 'monthly'
				}

				const transformed: PropertyDetailsType = {
					id: backendData.id.toString(),
					title: backendData.title,
					description: backendData.description,
					type: normalizeType(backendData.type),
					location: {
						city: backendData.city || '',
						state: backendData.state || '',
						landmark: backendData.landmark || '',
						coordinates: { lat: 12.9716, lng: 77.5946 } 
					},
					price: {
						amount: backendData.rentAmount || 0,
						type: 'rent',
						frequency: normalizeRentType(backendData.rentType)
					},
					rating: backendData.rating || 0,
					features: backendData.features || [],
					restrictions: backendData.restrictions || [],
					media: backendData.media || [],
					owner: {
						name: ownerFullName,
						phone: backendData.owner?.phoneNumber || 'N/A',
						email: backendData.owner?.email || 'N/A'
					},
					dateAdded: backendData.dateAdded || new Date().toISOString(),
					// Fallback fields for PropertyCard compatibility
					rentAmount: backendData.rentAmount || 0,
					rentType: normalizeRentType(backendData.rentType),
					thumbnail: backendData.media?.[0] || '',
					city: backendData.city || '',
					state: backendData.state || '',
					locality: backendData.locality || '',
					landmark: backendData.landmark || ''
				}

				setProperty(transformed)
			} catch (err) {
				console.error('Error loading property:', err)
				setProperty(null)
			} finally {
				setLoading(false)
			}
		}

		loadProperty()
	}, [id])

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading property details...</p>
				</div>
			</div>
		)
	}

	if (!property) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h2>
					<button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-700 font-medium">
						Back to properties
					</button>
				</div>
			</div>
		)
	}

	const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % (property.media?.length || 1))

	const prevImage = () =>
		setCurrentImageIndex((prev) => (prev - 1 + (property.media?.length || 1)) % (property.media?.length || 1))

	const handleRentBuy = () => {
		if (!user) {
			navigate('/login')
			return
		}
		alert(`Interest registered for ${property.title}!`)
	}

	const formatPrice = (price: PropertyDetailsType['price']) => {
		if (price.type === 'rent') {
			return `₹${price.amount.toLocaleString('en-IN')}/${price.frequency}`
		}
		return `₹${price.amount.toLocaleString('en-IN')}`
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-IN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<button
					onClick={() => navigate('/')}
					className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
				>
					<ChevronLeft className="w-5 h-5 mr-1" />
					Back to Properties
				</button>

				<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
					<div className="relative h-96 md:h-[500px] bg-gray-200">
						{property.media && property.media.length > 0 ? (
							<img
								src={property.media[currentImageIndex]}
								alt={`${property.title} - Image ${currentImageIndex + 1}`}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.currentTarget.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available'
								}}
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center">
								<p className="text-gray-500">No images available</p>
							</div>
						)}

						{property.media && property.media.length > 1 && (
							<>
								<button
									onClick={prevImage}
									className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
								>
									<ChevronLeft className="w-6 h-6" />
								</button>
								<button
									onClick={nextImage}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
								>
									<ChevronRight className="w-6 h-6" />
								</button>

								{/* Image Counter */}
								<div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
									{currentImageIndex + 1} / {property.media.length}
								</div>
							</>
						)}

						<div className="absolute top-4 right-4 flex gap-2">
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
							>
								<Heart
									className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
								/>
							</button>
							<button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
								<Share className="w-6 h-6 text-gray-700" />
							</button>
						</div>
					</div>

					<div className="p-8">
						<div className="mb-6">
							<div className="flex justify-between items-start mb-4">
								<div>
									<h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
									<div className="flex items-center text-gray-600 mb-2">
										<MapPin className="w-5 h-5 mr-2" />
										<span>
											{property.locality}, {property.city}, {property.state}
										</span>
									</div>
									{property.landmark && (
										<div className="flex items-center text-gray-500 text-sm">
											<MapPin className="w-4 h-4 mr-2" />
											<span>Near {property.landmark}</span>
										</div>
									)}
								</div>
								<div className="text-right">
									<div className="text-3xl font-bold text-blue-600 mb-2">
										{formatPrice(property.price)}
									</div>
									<div className="flex items-center">
										<Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
										<span className="font-semibold">{property.rating}</span>
									</div>
								</div>
							</div>

							<span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
								{property.type}
							</span>
						</div>

						<div className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
							<p className="text-gray-600 leading-relaxed">{property.description}</p>
						</div>

						{property.features && property.features.length > 0 && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
								<div className="flex flex-wrap gap-2">
									{property.features.map((feature, index) => (
										<span
											key={index}
											className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
										>
											{feature}
										</span>
									))}
								</div>
							</div>
						)}

						{property.restrictions && property.restrictions.length > 0 && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-3">Restrictions</h2>
								<div className="flex flex-wrap gap-2">
									{property.restrictions.map((restriction, index) => (
										<span
											key={index}
											className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
										>
											{restriction}
										</span>
									))}
								</div>
							</div>
						)}

						<div className="mb-6 bg-gray-50 rounded-lg p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Owner Details</h2>
							<div className="space-y-3">
								<div className="flex items-center text-gray-700">
									<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
										<span className="text-blue-600 font-semibold">
											{property.owner.name.charAt(0).toUpperCase()}
										</span>
									</div>
									<div>
										<div className="font-medium">{property.owner.name}</div>
										<div className="text-sm text-gray-500">Property Owner</div>
									</div>
								</div>
								<div className="flex items-center text-gray-600">
									<Phone className="w-5 h-5 mr-3" />
									<span>{property.owner.phone}</span>
								</div>
								<div className="flex items-center text-gray-600">
									<Mail className="w-5 h-5 mr-3" />
									<span>{property.owner.email}</span>
								</div>
							</div>
						</div>

						<div className="flex items-center text-gray-500 text-sm mb-6">
							<Calendar className="w-4 h-4 mr-2" />
							<span>Listed on {formatDate(property.dateAdded)}</span>
						</div>

						<button
							onClick={handleRentBuy}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center"
						>
							<IndianRupee className="w-5 h-5 mr-2" />
							Express Interest
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PropertyDetails
