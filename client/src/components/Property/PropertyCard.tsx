import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Calendar, IndianRupee } from 'lucide-react'
import { PropertyCardType } from '../../types'

interface PropertyCardProps {
	property: PropertyCardType
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
	const formatPrice = (amount: number, rentType?: string) => {
		if (rentType) {
			return `₹${amount.toLocaleString('en-IN')} / ${rentType.toLowerCase()}`
		}
		return `₹${amount.toLocaleString('en-IN')}`
	}

	return (
		<Link to={`/property/${property.id}`}>
			<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
				{/* Image */}
				<div className="relative overflow-hidden h-48">
					<img
						src={property.thumbnail}
						alt={property.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>

					<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
						{property.type}
					</div>

					<div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
						<Star className="w-3 h-3 fill-current text-yellow-400" />
						<span>{property.rating}</span>
					</div>
				</div>

				{/* Info */}
				<div className="p-4">
					<h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">{property.title}</h3>

					<div className="flex items-center text-gray-600 text-sm mb-2">
						<MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
						<span className="line-clamp-1">
							{property.locality}, {property.city}, {property.state}
						</span>
					</div>

					<div className="flex items-center text-gray-600 text-sm mb-3">
						<Calendar className="w-4 h-4 mr-1" />
						<span>Added {new Date(property.dateAdded).toLocaleDateString('en-IN')}</span>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center text-blue-600 font-semibold">
							<IndianRupee className="w-4 h-4 mr-1" />
							<span>{formatPrice(property.rentAmount, property.rentType)}</span>
						</div>
						<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
							{property.rentType ? 'For Rent' : 'For Sale'}
						</span>
					</div>

					{/* Features */}
					<div className="flex flex-wrap gap-1 mt-3">
						{property.features?.slice(0, 3).map((feature) => (
							<span key={feature} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
								{feature}
							</span>
						))}

						{property.features && property.features.length > 3 && (
							<span className="text-xs text-gray-500">+{property.features.length - 3} more</span>
						)}
					</div>
				</div>
			</div>
		</Link>
	)
}

export default PropertyCard
