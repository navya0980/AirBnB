import React, { useState } from 'react';
import { X, Star, Heart, Share, Wifi, Car, MapPin, Calendar, Users } from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { reviews } from '../data/mockData';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const { state, dispatch } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  
  const isFavorite = state.favorites.includes(property.id);
  const propertyReviews = reviews.filter(review => review.propertyId === property.id);

  const handleFavoriteClick = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: property.id });
  };

  const handleBooking = () => {
    if (!state.currentUser) {
      dispatch({ type: 'TOGGLE_AUTH_MODAL' });
      return;
    }

    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.price;

    const booking = {
      id: Date.now().toString(),
      propertyId: property.id,
      userId: state.currentUser.id,
      startDate: checkIn,
      endDate: checkOut,
      guests,
      totalPrice,
      status: 'pending' as const
    };

    dispatch({ type: 'ADD_BOOKING', payload: booking });
    alert('Booking request sent! You will receive a confirmation email shortly.');
    onClose();
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * property.price;

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'Wifi': <Wifi className="h-5 w-5" />,
    'Free parking': <Car className="h-5 w-5" />,
    'Kitchen': <span className="h-5 w-5 flex items-center justify-center">🍳</span>,
    'Pool': <span className="h-5 w-5 flex items-center justify-center">🏊</span>,
    'Hot tub': <span className="h-5 w-5 flex items-center justify-center">🛁</span>,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{property.title}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-gray-700 fill-current" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-sm text-gray-500">({property.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}, {property.country}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleFavoriteClick}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'text-pink-500 fill-current' : 'text-gray-700'}`} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={property.images[selectedImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {property.images.slice(0, 5).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-pink-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Host Info */}
              <div className="flex items-center space-x-4 p-6 border border-gray-200 rounded-xl">
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">Hosted by {property.host.name}</h3>
                  {property.host.superhost && (
                    <span className="inline-block bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full mt-1">
                      Superhost
                    </span>
                  )}
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{property.maxGuests} guests</span>
                  </div>
                  <span>•</span>
                  <span>{property.bedrooms} bedrooms</span>
                  <span>•</span>
                  <span>{property.beds} beds</span>
                  <span>•</span>
                  <span>{property.bathrooms} baths</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {amenityIcons[amenity] || <span className="h-5 w-5 flex items-center justify-center">•</span>}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="h-5 w-5 text-gray-700 fill-current" />
                  <h3 className="text-xl font-semibold">{property.rating} · {property.reviewCount} reviews</h3>
                </div>
                <div className="space-y-4">
                  {propertyReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 rounded-xl p-6 sticky top-8">
                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-2xl font-semibold">${property.price}</span>
                  <span className="text-gray-500">night</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          {num} guest{num !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-lg font-medium transition-colors"
                  >
                    {state.currentUser ? 'Reserve' : 'Log in to book'}
                  </button>

                  {nights > 0 && (
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span>${property.price} x {nights} nights</span>
                        <span>${property.price * nights}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;