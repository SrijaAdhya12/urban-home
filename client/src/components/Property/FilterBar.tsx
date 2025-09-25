import React from 'react';
import { Search, Filter, MapPin, IndianRupee, Star, Calendar } from 'lucide-react';
import { Filters } from '../../types';

interface FilterBarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const handleInputChange = (field: keyof Filters, value: string | number) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Location (city, landmark)"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        {/* Property Type */}
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
        </select>

        {/* Price Range */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Min Price"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.priceMin || ''}
              onChange={(e) => handleInputChange('priceMin', Number(e.target.value))}
            />
          </div>
          <div className="relative flex-1">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Max Price"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.priceMax || ''}
              onChange={(e) => handleInputChange('priceMax', Number(e.target.value))}
            />
          </div>
        </div>

        {/* Rating */}
        <div className="relative">
          <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            className="w-full"
            value={filters.rating}
            onChange={(e) => handleInputChange('rating', Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span className="font-medium">{filters.rating}+</span>
            <span>5</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Date Range */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.dateFrom}
              onChange={(e) => handleInputChange('dateFrom', e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.dateTo}
              onChange={(e) => handleInputChange('dateTo', e.target.value)}
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => onFiltersChange({
              location: '',
              priceMin: 0,
              priceMax: 0,
              type: '',
              rating: 0,
              dateFrom: '',
              dateTo: ''
            })}
            className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;