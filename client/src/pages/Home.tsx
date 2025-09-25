import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import PropertyCard from '../components/Property/PropertyCard';
import FilterBar from '../components/Property/FilterBar';
import Pagination from '../components/Property/Pagination';
import { Property, Filters } from '../types';
import { mockProperties } from '../data/mockData';

const Home: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    priceMin: 0,
    priceMax: 0,
    type: '',
    rating: 0,
    dateFrom: '',
    dateTo: ''
  });

  const propertiesPerPage = 12;

  useEffect(() => {
    // Simulate API call and get location
    const initializeData = async () => {
      setIsLoading(true);
      
      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation('Mumbai, Maharashtra'); // Mock location for demo
          },
          () => {
            setLocation('Location not available');
          }
        );
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  useEffect(() => {
    let filtered = properties;

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        (property.location.landmark && property.location.landmark.toLowerCase().includes(filters.location.toLowerCase()))
      );
    }

    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.priceMin > 0) {
      filtered = filtered.filter(property => property.price.amount >= filters.priceMin);
    }

    if (filters.priceMax > 0) {
      filtered = filtered.filter(property => property.price.amount <= filters.priceMax);
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(property => property.rating >= filters.rating);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(property => new Date(property.dateAdded) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(property => new Date(property.dateAdded) <= new Date(filters.dateTo));
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [filters, properties]);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Banner */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-700">
            Showing properties near: <span className="font-semibold text-blue-600">{location}</span>
          </span>
        </div>

        {/* Filters */}
        <FilterBar filters={filters} onFiltersChange={setFilters} />

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Properties
          </h2>
          <span className="text-gray-600">
            {filteredProperties.length} properties found
          </span>
        </div>

        {/* Properties Grid */}
        {currentProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => setFilters({
                location: '',
                priceMin: 0,
                priceMax: 0,
                type: '',
                rating: 0,
                dateFrom: '',
                dateTo: ''
              })}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;