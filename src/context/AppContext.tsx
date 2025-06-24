import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Property, User, SearchFilters, Booking } from '../types';
import { properties } from '../data/mockData';

interface AppState {
  properties: Property[];
  filteredProperties: Property[];
  currentUser: User | null;
  searchFilters: SearchFilters;
  favorites: string[];
  bookings: Booking[];
  isAuthModalOpen: boolean;
  isBookingModalOpen: boolean;
  selectedProperty: Property | null;
}

type AppAction =
  | { type: 'SET_SEARCH_FILTERS'; payload: Partial<SearchFilters> }
  | { type: 'SET_FILTERED_PROPERTIES'; payload: Property[] }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'TOGGLE_AUTH_MODAL' }
  | { type: 'TOGGLE_BOOKING_MODAL' }
  | { type: 'SET_SELECTED_PROPERTY'; payload: Property | null };

const initialState: AppState = {
  properties,
  filteredProperties: properties,
  currentUser: null,
  searchFilters: {
    location: '',
    startDate: '',
    endDate: '',
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    propertyType: '',
    amenities: []
  },
  favorites: [],
  bookings: [],
  isAuthModalOpen: false,
  isBookingModalOpen: false,
  selectedProperty: null
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SEARCH_FILTERS':
      return {
        ...state,
        searchFilters: { ...state.searchFilters, ...action.payload }
      };
    case 'SET_FILTERED_PROPERTIES':
      return {
        ...state,
        filteredProperties: action.payload
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    case 'TOGGLE_AUTH_MODAL':
      return {
        ...state,
        isAuthModalOpen: !state.isAuthModalOpen
      };
    case 'TOGGLE_BOOKING_MODAL':
      return {
        ...state,
        isBookingModalOpen: !state.isBookingModalOpen
      };
    case 'SET_SELECTED_PROPERTY':
      return {
        ...state,
        selectedProperty: action.payload
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};