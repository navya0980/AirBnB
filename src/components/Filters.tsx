import React, { useState } from 'react';
import { SlidersHorizontal, Home, Building, TreePine, Mountain, Waves, Castle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { propertyTypes, amenitiesList } from '../data/mockData';

const Filters: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(state.searchFilters);

  const propertyTypeIcons: { [key: string]: React.ReactNode } = {
    'House': <Home className="h-6 w-6" />,
    'Apartment': <Building className="h-6 w-6" />,
    'Villa': <Castle className="h-6 w-6" />,
    'Cabin': <TreePine className="h-6 w-6" />,
    'Treehouse': <TreePine className="h-6 w-6" />,
    'Loft': <Building className="h-6 w-6" />,
  };

  const applyFilters = () => {
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: localFilters });
    
    const filtered = state.properties.filter(property => {
      const matchesType = !localFilters.propertyType || property.type === localFilters.propertyType;
      const matchesPrice = property.price >= localFilters.minPrice && property.price <= localFilters.maxPrice;
      const matchesAmenities = localFilters.amenities.length === 0 || 
        localFilters.amenities.every(amenity => property.amenities.includes(amenity));
      
      return matchesType && matchesPrice && matchesAmenities;
    });
    
    dispatch({ type: 'SET_FILTERED_PROPERTIES', payload: filtered });
    setShowFilters(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      ...localFilters,
      propertyType: '',
      minPrice: 0,
      maxPrice: 1000,
      amenities: []
    };
    setLocalFilters(clearedFilters);
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: clearedFilters });
    dispatch({ type: 'SET_FILTERED_PROPERTIES', payload: state.properties });
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = localFilters.amenities;
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    setLocalFilters({ ...localFilters, amenities: updatedAmenities });
  };

  return (
    <>
      {/* Property Type Filter Pills */}
      <div className="flex items-center space-x-4 px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200 overflow-x-auto">
        <div className="flex items-center space-x-6 min-w-max">
          {Object.entries(propertyTypeIcons).map(([type, icon]) => (
            <button
              key={type}
              onClick={() => {
                const newType = localFilters.propertyType === type ? '' : type;
                const newFilters = { ...localFilters, propertyType: newType };
                setLocalFilters(newFilters);
                dispatch({ type: 'SET_SEARCH_FILTERS', payload: newFilters });
                
                const filtered = state.properties.filter(property => {
                  return !newType || property.type === newType;
                });
                dispatch({ type: 'SET_FILTERED_PROPERTIES', payload: filtered });
              }}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors ${
                localFilters.propertyType === type
                  ? 'bg-pink-50 text-pink-600 border-2 border-pink-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {icon}
              <span className="text-sm font-medium whitespace-nowrap">{type}</span>
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors min-w-max"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Advanced Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium mb-4">Price range</h3>
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

              {/* Property Type */}
              <div>
                <h3 className="text-lg font-medium mb-4">Property type</h3>
                <div className="grid grid-cols-3 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setLocalFilters({ 
                        ...localFilters, 
                        propertyType: localFilters.propertyType === type ? '' : type 
                      })}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        localFilters.propertyType === type
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{type}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-medium mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        localFilters.amenities.includes(amenity)
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-medium">{amenity}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear all
                </button>
                <button
                  onClick={applyFilters}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Show {state.filteredProperties.length} places
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;