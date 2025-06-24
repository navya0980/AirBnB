import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';

const PropertyGrid: React.FC = () => {
  const { state } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const selectedPropertyData = selectedProperty 
    ? state.filteredProperties.find(p => p.id === selectedProperty)
    : null;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No properties found matching your criteria.</div>
            <div className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</div>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              {state.filteredProperties.length} stays found
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {state.filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => setSelectedProperty(property.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedPropertyData && (
        <PropertyModal
          property={selectedPropertyData}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
};

export default PropertyGrid;