import React, { useState } from 'react';
import { MapPin, User, LogOut, Menu, X, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onSectionChange }) => {
  const { user, userProfile, logout, error, clearError } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home', description: 'Back to homepage' },
    { id: 'survey', label: 'Find Destinations', description: 'Discover new places' },
    { id: 'recommendations', label: 'Recommendations', description: 'Your personalized picks' },
    { id: 'map', label: 'Explore Map', description: 'Interactive world map' },
    { id: 'trending', label: 'Trending', description: 'Popular destinations' },
    { id: 'itinerary', label: 'My Itinerary', description: 'Your travel plans' },
    { id: 'profile', label: 'Profile', description: 'Account settings' }
  ];

  return (
    <>
      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{error}</p>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-yellow-400 hover:text-yellow-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TravelMind
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentSection === item.id
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200" />
                </button>
              ))}
            </nav>

            {/* Desktop User Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Search */}
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                    <Search className="h-5 w-5" />
                  </button>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 relative"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800 truncate max-w-32">
                        {userProfile?.displayName || user.email}
                      </p>
                      <p className="text-xs text-gray-500">Traveler</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onSectionChange('auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-start px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      currentSection === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.description}</span>
                  </button>
                ))}
                
                {user ? (
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {userProfile?.displayName || user.email}
                        </p>
                        <p className="text-sm text-gray-500">Traveler</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onSectionChange('auth');
                      setIsMenuOpen(false);
                    }}
                    className="mx-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;