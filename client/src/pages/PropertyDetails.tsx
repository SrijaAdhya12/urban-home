import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Star, Phone, Mail, Calendar, IndianRupee, ChevronLeft, ChevronRight, Heart, Share } from 'lucide-react'
import { Property } from '../types'
import { fetchPropertyById } from '../api'
import { useAuth } from '../context/AuthContext'

const PropertyDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { user } = useAuth()
	const [property, setProperty] = useState<Property | null>(null)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isFavorite, setIsFavorite] = useState(false)

	useEffect(() => {
		const loadProperty = async () => {
			try {
				const data = await fetchPropertyById(id!)
				setProperty(data)
			} catch (err) {
				console.error(err)
				setProperty(null)
			}
		}
		if (id) loadProperty()
	}, [id])
	
	if (!property) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h2>
					<button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-700">
						Back to properties
					</button>
				</div>
			</div>
		)
	}

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % property.media.length)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + property.media.length) % property.media.length)
	}

	const handleRentBuy = () => {
		if (!user) {
			navigate('/login')
			return
		}
		alert(`Interest registered for ${property.title}!`)
	}

	const formatPrice = (price: Property['price']) => {
		if (price.type === 'rent') {
			return `₹${price.amount.toLocaleString('en-IN')}/${price.frequency}`
		}
		return `₹${price.amount.toLocaleString('en-IN')}`
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
					{/* Image Gallery */}
					<div className="relative h-96 md:h-[500px]">
						<img
							src={property.media[currentImageIndex]}
							alt={property.title}
							className="w-full h-full object-cover"
						/>

						{property.media.length > 1 && (
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
							</>
						)}

						<div className="absolute top-4 right-4 flex space-x-2">
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className={`p-2 rounded-full transition-colors ${
									isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
								}`}
							>
								<Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
							</button>
							<button className="p-2 bg-white/90 text-gray-700 rounded-full hover:bg-white transition-colors">
								<Share className="w-6 h-6" />
							</button>
						</div>

						<div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
							{currentImageIndex + 1} / {property.media.length}
						</div>
					</div>

					<div className="p-8">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{/* Main Content */}
							<div className="lg:col-span-2">
								<div className="flex items-start justify-between mb-4">
									<div>
										<h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
										<div className="flex items-center text-gray-600 mb-2">
											<MapPin className="w-5 h-5 mr-2" />
											<span>
												{property.location.landmark ? `${property.location.landmark}, ` : ''}
												{property.location.city}, {property.location.state}
											</span>
										</div>
										<div className="flex items-center">
											<Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
											<span className="text-gray-700 font-medium">{property.rating}</span>
											<span className="text-gray-500 ml-1">rating</span>
										</div>
									</div>
									<div className="text-right">
										<div className="text-3xl font-bold text-blue-600 mb-1">
											{formatPrice(property.price)}
										</div>
										<span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
											{property.price.type === 'rent' ? 'For Rent' : 'For Sale'}
										</span>
									</div>
								</div>

								{/* Description */}
								<div className="mb-8">
									<h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
									<p className="text-gray-700 leading-relaxed">{property.description}</p>
								</div>

								{/* Features */}
								<div className="mb-8">
									<h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
									<div className="flex flex-wrap gap-2">
										{property.features.map((feature) => (
											<span
												key={feature}
												className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
											>
												{feature}
											</span>
										))}
									</div>
								</div>

								{/* Restrictions */}
								{property.restrictions && property.restrictions.length > 0 && (
									<div className="mb-8">
										<h2 className="text-xl font-semibold text-gray-900 mb-4">Restrictions</h2>
										<div className="flex flex-wrap gap-2">
											{property.restrictions.map((restriction) => (
												<span
													key={restriction}
													className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
												>
													{restriction}
												</span>
											))}
										</div>
									</div>
								)}
							</div>

							{/* Sidebar */}
							<div className="lg:col-span-1">
								<div className="bg-gray-50 rounded-xl p-6 mb-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-gray-600">
												Base {property.price.type === 'rent' ? 'Rent' : 'Price'}:
											</span>
											<span className="font-medium">
												₹{property.price.amount.toLocaleString('en-IN')}
											</span>
										</div>
										{property.price.brokerage && (
											<div className="flex justify-between">
												<span className="text-gray-600">Brokerage:</span>
												<span className="font-medium">
													₹{property.price.brokerage.toLocaleString('en-IN')}
												</span>
											</div>
										)}
										{property.price.maintenance && (
											<div className="flex justify-between">
												<span className="text-gray-600">Maintenance:</span>
												<span className="font-medium">
													₹{property.price.maintenance.toLocaleString('en-IN')}
												</span>
											</div>
										)}
										{property.price.gst && (
											<div className="flex justify-between">
												<span className="text-gray-600">GST:</span>
												<span className="font-medium">
													₹{property.price.gst.toLocaleString('en-IN')}
												</span>
											</div>
										)}
										<div className="border-t pt-3 flex justify-between font-semibold text-lg">
											<span>Total:</span>
											<span className="text-blue-600">
												₹
												{(
													property.price.amount +
													(property.price.brokerage || 0) +
													(property.price.maintenance || 0) +
													(property.price.gst || 0)
												).toLocaleString('en-IN')}
											</span>
										</div>
									</div>
								</div>

								{/* Owner Details */}
								<div className="bg-gray-50 rounded-xl p-6 mb-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Details</h3>
									<div className="space-y-3">
										<p className="font-medium text-gray-900">{property.owner.name}</p>
										<div className="flex items-center text-gray-600">
											<Phone className="w-4 h-4 mr-2" />
											<span>{property.owner.phone}</span>
										</div>
										<div className="flex items-center text-gray-600">
											<Mail className="w-4 h-4 mr-2" />
											<span>{property.owner.email}</span>
										</div>
									</div>
								</div>

								{/* Property Info */}
								<div className="bg-gray-50 rounded-xl p-6 mb-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">Property Info</h3>
									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-gray-600">Type:</span>
											<span className="font-medium">{property.type}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-600">Listed:</span>
											<div className="flex items-center">
												<Calendar className="w-4 h-4 mr-1 text-gray-400" />
												<span className="font-medium">
													{new Date(property.dateAdded).toLocaleDateString('en-IN')}
												</span>
											</div>
										</div>
									</div>
								</div>

								{/* Action Button */}
								<button
									onClick={handleRentBuy}
									className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center"
								>
									<IndianRupee className="w-5 h-5 mr-2" />
									{property.price.type === 'rent' ? 'Rent Now' : 'Buy Now'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PropertyDetails
