import React, { useState } from 'react';
import { Search, Menu, User, Globe, Heart, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleAuthClick = () => {
    dispatch({ type: 'TOGGLE_AUTH_MODAL' });
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-pink-500">airbnb</span>
          </div>

          {/* Search Bar */}
          <div 
            className="hidden md:flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <div className="px-6 py-2 border-r border-gray-300">
              <div className="text-sm font-medium text-gray-900">Where</div>
              <div className="text-sm text-gray-500">
                {state.searchFilters.location || 'Search destinations'}
              </div>
            </div>
            <div className="px-6 py-2 border-r border-gray-300">
              <div className="text-sm font-medium text-gray-900">Check in</div>
              <div className="text-sm text-gray-500">
                {state.searchFilters.startDate || 'Add dates'}
              </div>
            </div>
            <div className="px-6 py-2 border-r border-gray-300">
              <div className="text-sm font-medium text-gray-900">Check out</div>
              <div className="text-sm text-gray-500">
                {state.searchFilters.endDate || 'Add dates'}
              </div>
            </div>
            <div className="px-6 py-2">
              <div className="text-sm font-medium text-gray-900">Who</div>
              <div className="text-sm text-gray-500">
                {state.searchFilters.guests > 1 ? `${state.searchFilters.guests} guests` : 'Add guests'}
              </div>
            </div>
            <button className="bg-pink-500 text-white p-2 rounded-full mr-2 hover:bg-pink-600 transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Search */}
          <div 
            className="md:hidden flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-4 py-2 cursor-pointer"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <Search className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-sm text-gray-600">Where to?</span>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-2">
            <button className="hidden md:block p-3 hover:bg-gray-100 rounded-full transition-colors">
              <span className="text-sm font-medium text-gray-700">Airbnb your home</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Globe className="h-4 w-4 text-gray-700" />
            </button>
            <div className="relative">
              <button 
                className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <Menu className="h-4 w-4 text-gray-700" />
                <div className="bg-gray-500 rounded-full p-1">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {state.currentUser ? (
                    <>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 font-medium">
                        Messages
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 font-medium">
                        Trips
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 font-medium">
                        Wishlists
                      </button>
                      <hr className="my-2" />
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        Manage listings
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        Host an experience
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        Account
                      </button>
                      <hr className="my-2" />
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-gray-50"
                        onClick={() => dispatch({ type: 'SET_CURRENT_USER', payload: null })}
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 font-medium"
                        onClick={handleAuthClick}
                      >
                        Sign up
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-gray-50"
                        onClick={handleAuthClick}
                      >
                        Log in
                      </button>
                      <hr className="my-2" />
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        Airbnb your home
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        Host an experience
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        Help
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;