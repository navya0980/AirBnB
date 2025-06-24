import { Property, Review } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Stunning Beachfront Villa with Ocean Views',
    type: 'Villa',
    location: 'Malibu, California',
    country: 'United States',
    price: 450,
    rating: 4.9,
    reviewCount: 127,
    images: [
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true
    },
    amenities: ['Wifi', 'Kitchen', 'Pool', 'Hot tub', 'Free parking', 'Ocean view', 'Beach access'],
    description: 'Escape to this breathtaking beachfront villa offering unparalleled ocean views and direct beach access. Perfect for a romantic getaway or family vacation.',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    beds: 4
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin in the Woods',
    type: 'Cabin',
    location: 'Aspen, Colorado',
    country: 'United States',
    price: 280,
    rating: 4.8,
    reviewCount: 94,
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Michael Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: false
    },
    amenities: ['Wifi', 'Kitchen', 'Fireplace', 'Free parking', 'Mountain view', 'Hot tub'],
    description: 'A charming mountain retreat surrounded by pristine wilderness. Perfect for skiing in winter and hiking in summer.',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    beds: 3
  },
  {
    id: '3',
    title: 'Modern Downtown Loft with City Views',
    type: 'Loft',
    location: 'New York, New York',
    country: 'United States',
    price: 320,
    rating: 4.7,
    reviewCount: 203,
    images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true
    },
    amenities: ['Wifi', 'Kitchen', 'Gym', 'City view', 'Air conditioning', 'Elevator'],
    description: 'Stylish loft in the heart of Manhattan with stunning city views and walking distance to major attractions.',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2
  },
  {
    id: '4',
    title: 'Luxury Lakefront Retreat',
    type: 'House',
    location: 'Lake Tahoe, California',
    country: 'United States',
    price: 380,
    rating: 4.9,
    reviewCount: 156,
    images: [
      'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571451/pexels-photo-1571451.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457849/pexels-photo-1457849.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'David Brown',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true
    },
    amenities: ['Wifi', 'Kitchen', 'Lake access', 'Kayak', 'Fire pit', 'BBQ grill', 'Free parking'],
    description: 'Beautiful lakefront property with private dock and stunning mountain views. Perfect for water activities and relaxation.',
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    beds: 6
  },
  {
    id: '5',
    title: 'Charming European-Style Apartment',
    type: 'Apartment',
    location: 'Paris, France',
    country: 'France',
    price: 190,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457845/pexels-photo-1457845.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643387/pexels-photo-1643387.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Marie Dubois',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: false
    },
    amenities: ['Wifi', 'Kitchen', 'Balcony', 'City view', 'Metro nearby'],
    description: 'Authentic Parisian apartment in the heart of Montmartre with charming French décor and easy access to attractions.',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2
  },
  {
    id: '6',
    title: 'Tropical Jungle Treehouse',
    type: 'Treehouse',
    location: 'Costa Rica',
    country: 'Costa Rica',
    price: 220,
    rating: 4.8,
    reviewCount: 67,
    images: [
      'https://images.pexels.com/photos/1029618/pexels-photo-1029618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457843/pexels-photo-1457843.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029595/pexels-photo-1029595.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Carlos Rodriguez',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true
    },
    amenities: ['Wifi', 'Kitchen', 'Jungle view', 'Wildlife viewing', 'Hiking trails', 'Eco-friendly'],
    description: 'Unique treehouse experience immersed in the Costa Rican rainforest with incredible wildlife and nature sounds.',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    propertyId: '1',
    userId: '1',
    userName: 'Jennifer Smith',
    userAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'Absolutely stunning property! The ocean views were breathtaking and Sarah was an amazing host. Everything was exactly as described.',
    date: '2024-01-15'
  },
  {
    id: '2',
    propertyId: '1',
    userId: '2',
    userName: 'Mark Thompson',
    userAvatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'Perfect location for a family vacation. The kids loved the beach access and the adults enjoyed the peaceful mornings on the deck.',
    date: '2024-01-08'
  },
  {
    id: '3',
    propertyId: '2',
    userId: '3',
    userName: 'Lisa Davis',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'The mountain cabin exceeded our expectations! Cozy, clean, and the hot tub under the stars was magical.',
    date: '2024-01-10'
  }
];

export const amenitiesList = [
  'Wifi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning', 'Heating', 'Dedicated workspace',
  'TV', 'Hair dryer', 'Iron', 'Pool', 'Hot tub', 'Free parking', 'Gym', 'Beach access',
  'Ski-in/Ski-out', 'Smoking allowed', 'Pets allowed', 'Events allowed', 'Lake access',
  'Mountain view', 'Ocean view', 'City view', 'Garden view', 'Fireplace', 'Piano',
  'BBQ grill', 'Fire pit', 'Outdoor dining area', 'Balcony', 'Patio'
];

export const propertyTypes = [
  'House', 'Apartment', 'Villa', 'Cabin', 'Loft', 'Treehouse', 'Boat', 'Castle',
  'Cave', 'Dome', 'Farm', 'Houseboat', 'Tent', 'Yurt', 'Windmill', 'Lighthouse'
];