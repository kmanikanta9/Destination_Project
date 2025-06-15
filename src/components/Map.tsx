import React, { useState } from 'react';
import { MapPin, Star, Navigation, Search, Filter } from 'lucide-react';
import { destinations, Destination } from '../data/destinations';

interface MapProps {
  onDestinationSelect: (destination: Destination) => void;
}

const Map: React.FC<MapProps> = ({ onDestinationSelect }) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || dest.category.includes(filterCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'culture', label: 'Culture' },
    { id: 'relaxation', label: 'Relaxation' }
  ];

  // Simple world map representation with positioned markers
  const getMarkerPosition = (destination: Destination) => {
    // Convert lat/lng to percentage positions on our world map
    const lat = destination.coordinates.lat;
    const lng = destination.coordinates.lng;
    
    // Simple mercator-like projection for demo
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing places around the world on our interactive map
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`px-3 py-1 rounded-full font-medium transition-colors ${
                      filterCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <h2 className="text-white text-xl font-semibold flex items-center">
                  <Navigation className="h-6 w-6 mr-2" />
                  World Map
                </h2>
              </div>
              
              {/* World Map Container */}
              <div className="relative h-96 md:h-[500px] bg-gradient-to-b from-blue-100 to-green-100">
                {/* Simplified world map background */}
                <div className="absolute inset-0 opacity-10">
                  <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-full"
                    style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #90EE90 100%)' }}
                  >
                    {/* Simple continent shapes */}
                    <path
                      d="M150 200 L300 180 L350 220 L280 280 L200 300 L120 250 Z"
                      fill="#8B5A2B"
                      opacity="0.3"
                    />
                    <path
                      d="M400 150 L600 140 L650 200 L580 250 L500 260 L420 220 Z"
                      fill="#8B5A2B"
                      opacity="0.3"
                    />
                    <path
                      d="M700 180 L850 170 L900 220 L820 280 L750 290 L680 240 Z"
                      fill="#8B5A2B"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                {/* Destination Markers */}
                {filteredDestinations.map((destination) => {
                  const position = getMarkerPosition(destination);
                  return (
                    <button
                      key={destination.id}
                      onClick={() => setSelectedDestination(destination)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                      style={{ left: `${position.x}%`, top: `${position.y}%` }}
                    >
                      <div className="relative">
                        <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                      </div>
                    </button>
                  );
                })}

                {/* Selected Destination Popup */}
                {selectedDestination && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{selectedDestination.name}</h3>
                        <p className="text-gray-600 text-sm">{selectedDestination.country}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium ml-1">{selectedDestination.averageRating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{selectedDestination.estimatedDays} days</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onDestinationSelect(selectedDestination)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => setSelectedDestination(null)}
                          className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Destination List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-semibold text-gray-800">
                Destinations ({filteredDestinations.length})
              </h3>
            </div>
            
            <div className="max-h-96 md:max-h-[500px] overflow-y-auto">
              {filteredDestinations.map((destination) => (
                <button
                  key={destination.id}
                  onClick={() => setSelectedDestination(destination)}
                  className="w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 truncate">{destination.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{destination.country}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium ml-1">{destination.averageRating}</span>
                        </div>
                        <span className="text-xs text-gray-600">{destination.estimatedDays}d</span>
                      </div>
                    </div>
                    <MapPin 
                      className={`h-5 w-5 ${
                        selectedDestination?.id === destination.id 
                          ? 'text-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;