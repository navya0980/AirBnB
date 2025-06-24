import React, { useState } from 'react';
import { X, Search, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const { state, dispatch } = useApp();
  const [localFilters, setLocalFilters] = useState(state.searchFilters);

  const handleSearch = () => {
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: localFilters });
    
    // Filter properties based on search criteria
    const filtered = state.properties.filter(property => {
      const matchesLocation = !localFilters.location || 
        property.location.toLowerCase().includes(localFilters.location.toLowerCase()) ||
        property.country.toLowerCase().includes(localFilters.location.toLowerCase());
      
      const matchesGuests = property.maxGuests >= localFilters.guests;
      const matchesPrice = property.price >= localFilters.minPrice && property.price <= localFilters.maxPrice;
      const matchesType = !localFilters.propertyType || property.type === localFilters.propertyType;
      
      return matchesLocation && matchesGuests && matchesPrice && matchesType;
    });
    
    dispatch({ type: 'SET_FILTERED_PROPERTIES', payload: filtered });
    onClose();
  };

  const handleGuestChange = (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => {
    const currentGuests = localFilters.guests;
    let newGuests = currentGuests;
    
    if (operation === 'add') {
      newGuests = currentGuests + 1;
    } else if (operation === 'subtract' && currentGuests > 1) {
      newGuests = currentGuests - 1;
    }
    
    setLocalFilters({ ...localFilters, guests: newGuests });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Search</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Location */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Where
            </label>
            <input
              type="text"
              placeholder="Search destinations"
              value={localFilters.location}
              onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Check in
              </label>
              <input
                type="date"
                value={localFilters.startDate}
                onChange={(e) => setLocalFilters({ ...localFilters, startDate: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Check out
              </label>
              <input
                type="date"
                value={localFilters.endDate}
                onChange={(e) => setLocalFilters({ ...localFilters, endDate: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Who
            </label>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Adults</div>
                  <div className="text-sm text-gray-500">Ages 13 or above</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleGuestChange('adults', 'subtract')}
                    className="p-2 border border-gray-300 rounded-full hover:border-gray-400 disabled:opacity-50"
                    disabled={localFilters.guests <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{localFilters.guests}</span>
                  <button
                    onClick={() => handleGuestChange('adults', 'add')}
                    className="p-2 border border-gray-300 rounded-full hover:border-gray-400"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Price range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min price</label>
                <input
                  type="number"
                  value={localFilters.minPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, minPrice: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="$0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max price</label>
                <input
                  type="number"
                  value={localFilters.maxPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: parseInt(e.target.value) || 1000 })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="$1000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocalFilters(state.searchFilters)}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Clear all
            </button>
            <button
              onClick={handleSearch}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;