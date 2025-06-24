export interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  country: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
  };
  amenities: string[];
  description: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isHost: boolean;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SearchFilters {
  location: string;
  startDate: string;
  endDate: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  amenities: string[];
}